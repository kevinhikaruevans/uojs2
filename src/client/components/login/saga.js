import { forkActionWatcher } from 'redux-actions-helpers-saga'
import { select, call, put, fork } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga'

import { auth } from './actions'
import { actions as actionsConnect } from 'component/connect'

//
import { Packet } from './../../network/packet'

export function* fetchAuth({ transport, username, password, host, port }) {
    try {
        const connect = yield select(store => store.connect);

        if(connect.status) {
            yield connectSuccess({
                username,
                password
            }, transport);
        } else {
            yield put(
                actionsConnect.connect(transport, {
                    host,
                    port
                })
            );
        }

        console.log('AUTH down put');
    } catch (error) {
        console.log('AUTH error', error);
        // yield put(connectError(error));
    }
}

export function* connectSuccess({ username, password }, transport) {
    console.log('aaaaaaaaaaaaaaaaaaa', transport);
    try {
        const connect = yield select(store => store.connect);
        const seed = connect.ip.split('.').map(item => +item);

        console.log(connect, transport);
        transport.sendPacket(new Packet(seed));
        // yield put(connectSuccess(connect.ip));
    } catch (error) {
        console.log('ERROR', error)
        // yield put(connectError(error));
    }
}



export default function *loginSaga() {
    yield forkActionWatcher(takeEvery, auth, fetchAuth);
    yield forkActionWatcher(takeEvery, actionsConnect.connectSuccess, connectSuccess);
}
