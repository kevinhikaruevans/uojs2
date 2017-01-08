import { request } from './actions'

import { handleActions } from 'redux-actions-helpers'

const initialState = {
    serial  : null,
    list    : []
};

export default handleActions({
    [request] : (state, { serial }) => ({
        ...state,
        serial
    })
}, {
    initialState
})
