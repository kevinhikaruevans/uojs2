import { handleActions } from 'redux-actions-helpers'

import { updateMap, updateCoordinates, updateTiles } from './actions'

const initialState = {
    x       : null,
    y       : null,
    id      : null,
    tiles   : []
};

export default handleActions({
    [updateMap] : (state, { id }) => ({
        ...state,
        id
    }),
    [updateCoordinates] : (state, { x, y }) => ({
        ...state,
        x,
        y
    }),
    [updateTiles] : (state, { tiles }) => ({
        ...state,
        tiles
    })
}, {
    initialState
})
