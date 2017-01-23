import { createAction } from 'redux-actions-helpers'

export const updateTiles = createAction('@@map/UPDATE_TILES', ({ blockX, blockY, tiles }) => ({
    blockX,
    blockY,
    tiles
}));

export const updateMap = createAction('@@map/UPDATE_MAP', ({ id }) => ({
    id
}));

export const updateCoordinates = createAction('@@map/UPDATE_COORDINATES', ({ x, y }) => ({
    x,
    y
}));

const hasFullBlock = ({blockX, blockY, getState}) => {
    const state = getState().map;
    const tiles = state.tiles || [];

    for(let x = blockX; x < blockX + 8; x++) {
        for(let y = blockY; y < blockY + 8; y++) {
            if (!tiles[x] ||  !tiles[x][y]) {
                return false;
            }
        }
    }
    return true;
};

const requestTiles = ({ x, y, id, size, transport, dispatch }) => {
    const request = transport.sendObject({
        event  : 'map:tiles',
        payout : {
            x,
            y,
            id,
            size
        }
    });

    request
        .then(
            (tiles) => dispatch(updateTiles({
                tiles
            })),
            console.error
        );

};

const requestBlock = ({ blockX, blockY, id, dispatch, getState, transport }) => {
    if (!hasFullBlock({blockX, blockY, getState})) {
        //console.log(`get map for (${x}, ${y})`);
        console.log(`get block for (${blockX}, ${blockY})`);
        /*
        TODO:
            - detect if new position != old position (is refreshing tiles even needed?)
            - detect if needs new tiles
            - get multiple blocks
            - clear cache if map changes
         */
        const request = transport
            .sendObject({
                event  : 'map:block',
                payout : {
                    x  : blockX,
                    y  : blockY,
                    id
                }
            });

        request
            .then(
                (tiles) => dispatch(updateTiles({ blockX, blockY, tiles })),
                console.error
            );
    }
};
let lastBlockRequest = {};

export const updateMaster = ({ x, y, id }) => (dispatch, getState, transport) => {
    if (id) {
        dispatch(updateMap({ id }));
    }
    if (x && y) {
        dispatch(updateCoordinates({ x, y }));
    }

    const state = getState().map;

    x = x || state.x;
    y = y || state.y;
    id = id === undefined ? state.id : id;
    if (x && y && id !== null && id !== undefined) {
        requestTiles({
            x,
            y,
            id,
            size : 30,
            transport,
            dispatch
        });
    }
};

export default {
    updateCoordinates,
    updateMap,
    updateMaster
};
