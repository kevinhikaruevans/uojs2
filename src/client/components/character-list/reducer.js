import { characterList } from './actions'

import { handleActions } from 'redux-actions-helpers'

const initialState = {
    list    : [],
    cities  : [],
    status  : false
};

export default handleActions({
    [characterList] : (state, { list, cities }) => ({
        list,
        cities,
        status : true
    })
}, {
    initialState
})
