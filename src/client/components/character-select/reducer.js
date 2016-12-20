import { handleActions } from 'redux-actions-helpers'

import { select } from './actions'

const initialState = {
    index : null
};

export default handleActions({
    [select] : (state, { index }) => ({
        index
    })
}, {
    initialState
})
