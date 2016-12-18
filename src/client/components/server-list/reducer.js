import { handleActions } from 'redux-actions-helpers'

import { list } from './actions'

const initialState = {
    list    : [],
    status  : false
};

export default handleActions({
    [list] : (state, { list }) => ({
        list,
        status  : true
    })
}, {
    initialState
})
