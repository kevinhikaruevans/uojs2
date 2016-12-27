import { handleActions } from 'redux-actions-helpers'

import { update } from './actions'

const initialState = {
    hour    : null,
    minute  : null,
    second  : null
};

export default handleActions({
    [update] : (state, { hour, minute, second }) => ({
        hour,
        minute,
        second
    })
}, {
    initialState
})
