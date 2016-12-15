import { connect, connectSuccess, connectError } from './actions'

import { handleActions } from 'redux-actions-helpers'

const initialState = {
    host    : null,
    port    : null,
    ip      : null,
    error   : null
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
        ip
    }),
    [connectError] : (state, { error }) => ({
        ...state,
        error
    })
}, {
    initialState
})
