import { handleActions } from 'redux-actions-helpers'

import { overall, personal } from './actions'

const initialState = {
    overall     : null,
    personal    : {
        level   : null,
        object  : null
    }
};

export default handleActions({
    [overall] : (state, { overall }) => ({
        ...state,
        overall
    }),
    [personal] : (state, { level, object }) => ({
        ...state,
        personal : {
            level,
            object
        }
    })
}, {
    initialState
})
