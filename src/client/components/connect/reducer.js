import {
    connect,
    connectSuccess,
    connectError,
    compressionEnable,
    compressionDisable
} from './actions'

import { handleActions } from 'redux-actions-helpers'

const initialState = {
    host        : null,
    port        : null,
    ip          : null,
    error       : null,
    compression : false,
    status      : false
};

export default handleActions({
    [connect] : (state, { host, port }) => ({
        ...state,
        error : null,
        host,
        port
    }),
    [connectSuccess] : (state, { ip }) => ({
        ...state,
        ip,
        status : true
    }),
    [connectError] : (state, { error }) => ({
        ...state,
        error,
        status : false
    }),
    [compressionEnable] : state => ({
        ...state,
        compression : true
    }),
    [compressionDisable] : state => ({
        ...state,
        compression : false
    })
}, {
    initialState
})
