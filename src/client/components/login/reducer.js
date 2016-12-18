import { handleActions } from 'redux-actions-helpers'

import { auth, error } from './actions'

const initialState = {
    username: null,
    password: null,
    error   : null,
    status  : false
};

export default handleActions({
    [auth] : (state, { username, password }) => ({
        username,
        password,
        error   : null,
        status  : false
    }),
    [error] : (state, { error }) => ({
        ...state,
        error,
        status  : false
    })
}, {
    initialState
})
