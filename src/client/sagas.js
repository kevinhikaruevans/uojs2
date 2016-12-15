import { spawn } from 'redux-saga/effects'

import { saga as sagaConnect} from 'component/connect'

export default function* rootSaga() {
    yield spawn(sagaConnect);
}
