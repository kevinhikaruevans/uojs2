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
    [updateTiles] : (state, { blockX, blockY, tiles }) => {
        const origTiles = state.tiles.slice();
        tiles.forEach((tile, index) => {
            const x = blockX * 8 + index % 8; // the % and / might be backwards for (x, y)
            const y = blockY * 8 + ~~(index / 8);

            if (origTiles[x] === undefined) {
                origTiles[x] = [];
            }

            origTiles[x][y] = tile;
        });
        console.log('update tiles', origTiles);
        return {
            ...state,
            tiles : origTiles
        };
    }
}, {
    initialState
})
