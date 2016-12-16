import { connect, connectSuccess, connectError } from './actions'

import { handleActions } from 'redux-actions-helpers'

const initialState = {
    host    : null,
    port    : null,
    ip      : null,
    error   : null,
    status  : false
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
    })
}, {
    initialState
})
