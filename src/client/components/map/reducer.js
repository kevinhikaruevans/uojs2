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
        // const origTiles = state.tiles.slice(0);
        // const length = Math.sqrt(tiles.length);
        //
        // for(let _x = 0; _x < length; _x++) {
        //     for(let _y = 0; _y < length; _y++) {
        //         if (!origTiles[x + _x]) {
        //             origTiles[x + _x] = [];
        //         }
        //         origTiles[x + _x][y + _y] = tiles[_x][_y]
        //     }
        // }
        // console.log('origtiles', origTiles);
        const newTiles = [];
        console.log('updateTiles', x, y);
        for(let i = 0; i < tiles.length; i++) {
            newTiles[y + i] = [];
            for(let j = 0; j < tiles[i].length; j++) {
                newTiles[y + i][x + j] = tiles[i][j];
            }
        }
        return {
            ...state,
            tiles : newTiles
        };
    }
}, {
    initialState
})
