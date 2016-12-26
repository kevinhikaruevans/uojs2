import { set } from './actions'

import { handleActions } from 'redux-actions-helpers'

const initialState = {
    selected: 0,
    list    : [
        // @TODO: Go config list versions
        '7.0.13.0',
        '7.0.14.0'
    ]
};

export default handleActions({
    [set] : (state, { index }) => ({
        ...state,
        selected : index
    })
}, {
    initialState
})
