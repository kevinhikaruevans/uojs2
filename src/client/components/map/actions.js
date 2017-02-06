import { createAction } from 'redux-actions-helpers'

export const updateTiles = createAction('@@map/UPDATE_TILES', ({ x, y, tiles }) => ({
    x,
    y,
    tiles
}));

export const updateMap = createAction('@@map/UPDATE_MAP', ({ id }) => ({
    id
}));

export const updateCoordinates = createAction('@@map/UPDATE_COORDINATES', ({ x, y }) => ({
    x,
    y
}));

const requestTiles = ({ x, y, id, size, transport, dispatch }) => {
    let range = ~~(size / 2);
    let requestX = x - range;
    let requestY = y - range;
    const request = transport.sendObject({
        event  : 'map:tiles',
        payout : {
            x : requestX,
            y : requestY,
            id,
            size
        }
    });

    request
        .then(
            (tiles) => dispatch(updateTiles({
                x : requestX,
                y : requestY,
                tiles
            })),
            console.error
        );

};

let lastMapRequest = {};

/*
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

    console.log('update master', x, y, id);

    if (x && y && id !== null && id !== undefined) {
        if (lastMapRequest.x === x
            && lastMapRequest.y === y) {
            return;
        } else {
            lastMapRequest = {
                x,
                y
            };
        }
        requestTiles({
            x,
            y,
            id,
            dispatch,
            getState,
            transport
        });
    }
};*/

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
            size : 17,
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
