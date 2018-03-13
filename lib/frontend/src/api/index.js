import { eventChannel } from 'redux-saga'
import io from 'socket.io-client'
import constants from '../constants';
import https from 'https'
import { stringify } from 'querystring'
import { store } from '../index'


export function login(username, partyName) {

}

export function getSpotifyLogin() {
    let token = localStorage.getItem('bearerToken')
    const options = {
        hostname: constants.url + '/api/spotifyLogin',
        headers: { authorization: token },
    }
    https.get(options, (res) => {
        let data
        res.on('error', (e) => {
            console.log('error at spotify login on client: ' + e)
        })
        res.on('data', (d) => {
            data += d
        })
        res.on('end', () => {
            return (data)
        })
    })
}

export function connectSocket() {
    const token = localStorage.getItem('bearerToken')
    const socket = io(constants.webSocketsUrl, {
        extraHeaders: {
            authorization: token,
        }
    })
    return new Promise(resolve => {
        socket.emit('subscribe', {
            payload: 'test'
        })
        socket.on('CONNECTION_OK', () => {
            put({ type: 'CONNECTION_OK', payload: 'test' })
        })
        resolve(socket)

    })
}

export function subscribe(socket) {

}

export function wsSend(type, payload) {
    let ws = new io(constants.webSocketsUrl)
    ws.emit({ type: type, payload: payload })
    ws.close();
}
