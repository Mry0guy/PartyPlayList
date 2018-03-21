import { put, take, call, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { store } from '../index'
import constants from '../constants'
import https from 'https'
import { stringify } from 'querystring';
import request from 'request'
import io from 'socket.io-client'
import actions from '../actions'

//THE SIDE EFFECTS MODLE 
//engine: Redux Saga
//function* () {} is a genorator: a customisable iterator built much like a js function 


function* loginSaga(action) {

    var token 
    var userData
    try { 
        token = yield call(localStorage.getItem, 'bearerToken')
    } catch (e) {
        yield put(actions.ERROR(e))
    }
    if (token != null){
        console.log('token detected checking for change in user')        
        userData = yield call(getUserData, token)
        if (userData.user === action.user && userData == action.party) {
            console.log('token is valid, user data retrived')
            yield put(actions.TOKEN_RECIVED())
        }
    } else {
        console.log('null token, making a fresh user')
        yield call(login, action.user, action.party)
    }
}


function getUserData(token) {
    return (new Promise((resolve) => {
    request({
        url: 'https://' + constants.url + '/api/post',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'authorization': token
        },
        json: true,
        body: loginData
    }, (error, res, body) => {
        if (error) {
            console.error('an error ocurred at getUserData: ' + error)
            resolve()
        } else {
            console.log(res.AuthData)
            resolve(res.authdata)
        }
    })}).catch((e) => {throw e}))
}

function login(user, party) {
    const loginData = {
        user: user,
        party: party
    }
    request({
        url: 'https://' + constants.url + '/api/login',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        json: true,
        body: loginData
    }, (error, res, body) => {
        if (error) {
            console.error('an error ocurred at token creation: ' + error)
        } else {
            console.log('token recived: ' + body.token)
            localStorage.setItem('bearerToken', body.token)
            put(actions.TOKEN_RECIVED(body.token))
        }
    })
}

export function* setupSaga() {
    //yield takeEvery('SEARCH_QUERRY', searchSaga)
    yield takeEvery('SERVICE_LOGIN', loginSaga)
    yield takeEvery('TOKEN_RECIVED', socketConnectSaga)
    yield put(actions.SERVICE_LOGIN())
}

function* socketConnectSaga(action) {
    var socket
    try {
        socket = yield call(connect, action.token)
    } catch (e) {
        put(actions.ERROR(e))
        return;
    }
    try {
        const chan = yield call(subscribe, socket)
    } catch (e) {
        put(actions.ERROR(e))
        return;
    }
    console.log(chan)
    try {
        while (true) {
            const action = yield take(chan)
            yield put(action)
        }
    } catch (e) {
        put(actions.ERROR(e))
        return;
    }
}

function subscribe(socket) {
    return eventChannel(emitter => {
        socket.on('CONNECTION_OK', () => {
            emitter(actions.CONNECTION_OK())
        })
        socket.on('error', () => {
            emitter(actions.ERROR('socket connection error'))
        })
        return () => { }
    })
}

function connect(token) {
    return new Promise((resolve) => {
        const socket = io(constants.url, { query: token })
        resolve(socket)
    })
}

