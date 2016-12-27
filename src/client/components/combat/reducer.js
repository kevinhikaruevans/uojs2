import { handleActions } from 'redux-actions-helpers'

import { update } from './actions'

const initialState = {
    status : false
};

export default handleActions({
    [update] : (state, { status }) => ({
        status : !!status
    })
}, {
    initialState
})
