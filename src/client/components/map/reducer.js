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
        id,
        //tiles : state.id !== id ? [] : state.tiles
    }),
    [updateCoordinates] : (state, { x, y }) => ({
        ...state,
        x,
        y
    }),
    [updateTiles] : (state, { x, y, tiles }) => {
        return {
            ...state,
            tiles
        };
    }
}, {
    initialState
})
