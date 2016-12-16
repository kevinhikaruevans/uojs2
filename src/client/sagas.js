import { spawn } from 'redux-saga/effects'

import { saga as sagaConnect} from 'component/connect'
import { saga as sagaLogin } from 'component/login'

export default function* rootSaga() {
    yield spawn(sagaConnect);
    yield spawn(sagaLogin);
}
