import {
    setHost,
    setPort,
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
    [setHost] : (state, { host }) => ({
        ...state,
        host
    }),
    [setPort] : (state, { port }) => ({
        ...state,
        port
    }),
    [connect] : (state) => ({
        ...state,
        error : null
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
    [compressionEnable] : (state) => ({
        ...state,
        compression : true
    }),
    [compressionDisable] : (state) => ({
        ...state,
        compression : false
    })
}, {
    initialState
})
