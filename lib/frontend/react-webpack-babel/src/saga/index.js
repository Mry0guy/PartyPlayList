import { put, take, call } from 'redux-saga/effects'
//import { takeEvery } from 'redux-saga/effects'
import { connectSocket, subscribe } from '../api'
import constants from '../constants'


export function* setupSaga() 

export function* socketConnectSaga() {
    const socket = yield call(connectSocket, constants.url)
    const chan = yield call(subscribe, socket)
    while (true) {
        const action = yield take(chan)
        yield put(action)
    }
}
