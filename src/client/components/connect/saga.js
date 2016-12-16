import { forkActionWatcher } from 'redux-actions-helpers-saga'
import { select, call, put, fork } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga'

import { connect, connectSuccess, connectError } from './actions'

export function* fetchConnect({ transport, host, port }) {
    try {
        const connect = yield call([transport, transport.sendObject], {
            event   : 'connect:server',
            payout  : {
                host,
                port
            }
        });

        yield put(connectSuccess(connect.ip, transport));
    } catch (error) {
        yield put(connectError(error));
    }
}

export default function *connectSaga() {
    yield forkActionWatcher(takeEvery, connect, fetchConnect);
}
