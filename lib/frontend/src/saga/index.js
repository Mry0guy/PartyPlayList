import { put, take, call, takeEvery } from 'redux-saga/effects'
import { store } from '../index'
import { connectSocket, subscribe, wsSend, login, spotifyLogin } from '../api'
import constants from '../constants'
import https from 'https'
import { stringify } from 'querystring';
var request = require('request')


export function* searchSaga(action) {
    yield wsSend({ type: 'SEARCH_QUERY', payload: action.payload })
}

export function* loginSaga(action) {
    const query = stringify({ host: action.user, party: action.party })
    console.log(query)
    const url = constants.url + 'api/login' + query
    var data
    yield call(https.post, url, (res) => {
        res.on('error', (e) => { console.log('error on login post: ' + e) })
        res.on('data', (d) => {
            console.log(data)
            data += d
        })
        res.on('end', () => {
            console.log(data)
            let bearerResponse = JSON.parse(data)
            localStorage.setItem('bearerToken', bearerResponse.token)
        })
    })
    let spotifyLoginPage = yield call(spotifyLogin)
    put({ type: 'SPOTIFY_LOGIN', payload: spotifyLoginPage })
}

export function* tokenSaga() {
    console.log('Saga: token saga')
    var data
    const loginData = {
        user: 'false',
        party: 'none'
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
    console.log('Saga Over: Token Saga')

}

export function* setupSaga() {
    //yield takeEvery('SEARCH_QUERRY', searchSaga)
    yield takeEvery('HOST_LOGIN', loginSaga)
    yield takeEvery('TOKEN_RECIVED', socketConnectSaga)
    if (localStorage.getItem('bearerToken') === null) {
        yield call(tokenSaga)
    } else {
        yield call(socketConnectSaga)
    }
}

export function* socketConnectSaga() {
    console.log('Saga: Socket Connect Saga')
    const token = localStorage.getItem('bearerToken')
    console.log('token: ' + token)
    const socket = yield io(constants.url/*, {
        query: {
            token
        }
    }*/)
    console.log('socket built: ', socket)

    const chan = yield call(subscribe, connectedSocket)
    while (true) {
        const action = yield take(chan)
        console.log(action)
        yield dispatch(action)
    }
}



