import { features } from './actions'

import { handleActions } from 'redux-actions-helpers'

const initialState = {
    flag : null
};

export default handleActions({
    [features] : (state, { flag }) => ({
        flag
    })
}, {
    initialState
})
