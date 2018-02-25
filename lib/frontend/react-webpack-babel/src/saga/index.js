import { put, take, call } from 'redux-saga/effects'
//import { takeEvery } from 'redux-saga/effects'
import { connectSocket, subscribe, wsSend } from '../api'
import constants from '../constants'


export function* searchSaga(action) {
    yield wsSend({ type: 'SEARCH_QUERY', payload: action.payload })
}

export function* loginSaga(action) {
    yield wsSend({ type: 'ADMIN_LOGIN', payload: action.payload })
}

export function* setupSaga() {
    yield takeEvery('SEARCH_QUERRY', searchSaga)
    yield takeEvery('ADMiN_LOGIN', loginSaga)
    yield call(socketConnectSaga)
}

export function* socketConnectSaga() {
    const socket = yield call(connectSocket, constants.url)
    const chan = yield call(subscribe, socket)
    while (true) {
        const action = yield take(chan)
        yield put(action)
    }
}
