import { handleActions } from 'redux-actions-helpers'

import { auth } from './actions'

const initialState = {
    username: null,
    password: null,
    error   : null
};

export default handleActions({
    [auth] : (state, { username, password }) => ({
        username,
        password,
        error : null
    })
}, {
    initialState
})
