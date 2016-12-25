import { list, update, removeAction, removeError } from './actions'

import { handleActions } from 'redux-actions-helpers'

const initialState = {
    list        : [],
    cities      : [],
    removeAction: null,
    removeError : {},
    status      : false
};

export default handleActions({
    [list] : (state, { list, cities }) => ({
        ...state,
        list,
        cities,
        status : true
    }),
    [update] : (state, { list }) => ({
        ...state,
        list
    }),
    [removeAction] : (state, { index }) => ({
        ...state,
        removeAction : index,
        // @TODO: Can remove all errors? need discussion.
        removeError : {
            ...state.removeError,
            [index] : null
        }
    }),
    [removeError] : (state, { code, message }) => ({
        ...state,
        removeError : {
            ...state.removeError,
            [state.removeAction] : {
                code,
                message
            }
        }
    })
}, {
    initialState
})
