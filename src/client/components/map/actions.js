import { createAction } from 'redux-actions-helpers'

export const updateTiles = createAction('@@map/UPDATE_TILES', ({ tiles }) => ({
    tiles
}));

export const updateMap = createAction('@@map/UPDATE_MAP', ({ id }) => ({
    id
}));

export const updateCoordinates = createAction('@@map/UPDATE_COORDINATES', ({ x, y }) => ({
    x,
    y
}));

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
        /*
        TODO:
            - detect if new position != old position (is refreshing tiles needed?)
            - detect if needs new tiles
            - get multiple blocks
         */
         console.log({
             x  : ~~(x / 8),
             y  : ~~(y / 8),
             id
         });
        const request = transport
            .sendObject({
                event  : 'map:block',
                payout : {
                    x  : ~~(x / 8),
                    y  : ~~(y / 8),
                    id
                }
            });

        request
            .then(
                (tiles) => dispatch(updateTiles({ tiles })),
                console.error
            );
    }
};

export default {
    updateCoordinates,
    updateMap,
    updateMaster
}
