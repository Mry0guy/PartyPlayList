import { eventChannel } from 'redux-saga'
import io from 'socket.io-client'
import constants from '../constants';



export function connectSocket(url) {
    const socket = io(url)
    console.log('socket made')
    return new Promise(resolve => {
        console.log(socket.status)
        socket.on('connect', () => {
            console.log('connection sucsesful')
            resolve(socket)
        })
    })
}

export function subscribe(socket) {
    return eventChannel(emitter => {
        socket.on('CONNECTION_OK', () => {
            emitter({ type: 'CONNECTION_OK', payload: 'test' })
        })
        return () => { }
    })
}

export function wsSend(type, payload) {
    let ws = new io(constants.url)
    ws.emit({ type: type, payload: payload })
    ws.close();
}
