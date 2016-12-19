import { login } from './actions'

import { handleActions } from 'redux-actions-helpers'

const initialState = {
    key : null
};

export default handleActions({
    [login] : (state, { key }) => ({
        key
    })
}, {
    initialState
})
