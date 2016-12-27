import { handleActions } from 'redux-actions-helpers'

import { auth, error, confirm, complete } from './actions'

const initialState = {
    username: null,
    password: null,
    error   : null,
    status  : false,
    confirm : false,
    complete: false
};

export default handleActions({
    [auth] : (state, { username, password }) => ({
        username,
        password,
        error   : null,
        status  : true
    }),
    [error] : (state, { error }) => ({
        ...state,
        error,
        status  : false
    }),
    [confirm] : state => ({
        ...state,
        confirm : true
    }),
    [complete] : state => ({
        ...state,
        complete : true
    })
}, {
    initialState
})
