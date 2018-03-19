import { put, take, call, takeEvery } from 'redux-saga/effects'
import { store } from '../index'
import { login, spotifyLogin } from '../api'
import constants from '../constants'
import https from 'https'
import { stringify } from 'querystring';
var request = require('request')
import io from 'socket.io-client'


export function* loginSaga(action) {
    const loginData = {
        user: action.user,
        party: action.party
    }
    request({
        url: constants.url + '/api/login/',
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
            localStorage.setItem('bearerToken', body.token)
            put({ type: 'TOKEN_RECIVED' })
        }
    })
}

function* testSaga() {
    const token = yield localStorage.getItem('bearerToken')
    const client = yield io(constants.url, { query: token })
    client.on('connect', () => {
        console.log('connect')
    })
}


export function* setupSaga() {
    //yield takeEvery('SEARCH_QUERRY', searchSaga)
    yield call(testSaga)
    yield takeEvery('HOST_LOGIN', loginSaga)
    yield Put('HOST_LOGIN', { user: 'guest', party: null })
    yield fork(socketConnectSaga)
}

export function* socketConnectSaga() {
    const token = localStorage.getItem('bearerToken')
    console.log('token: ' + token)
    const socket = yield io(constants.url)
    console.log(socket)
    try {
        const chan = yield call(subscribe, socket)
    } catch (e) {
        console.error(e)
    }
    socket.emit('subscribe')
    try {
        while (true) {
            const action = yield take(chan)
            console.log(action)
            yield put(action)
        }
    } catch (error) {
        console.error(error)
    }
}

function subscribe(socket) {
    return eventChannel(emitter => {
        socket.on('CONNECTION_OK', () => {
            emitter({ type: 'CONNECTION_OK', payload: 'test' })
        })
        socket.on('error', () => {
            emitter({ type: 'ERROR', payload: 'socket connect problems' })
        })
        return () => { }
    })
}


