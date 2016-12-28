import { handleActions } from 'redux-actions-helpers'

import { update } from './actions'

const initialState = {
    x       : null,
    y       : null,
    tiles   : []
};

export default handleActions({
    [update] : (state, { x, y, tiles }) => ({
        x,
        y,
        tiles
    })
}, {
    initialState
})
