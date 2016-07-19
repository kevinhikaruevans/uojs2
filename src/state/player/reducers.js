import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

export default handleActions({
    [types.PLAYER_UPDATE_HEALTH]: (state, action) =>
        update(state, {
            health: { $set: action.payload.health },
            maxHealth: { $set: action.payload.maxHealth }
        }),

    [types.PLAYER_UPDATE_WARMODE]: (state, action) =>
        update(state, {
            warMode: { $set: action.payload }
        }),

    [types.PLAYER_UPDATE_SELF]: (state, action) =>
        update(state, {
            $merge: action.payload
        }),

    [types.PLAYER_UPDATE_STATS]: (state, action) =>
        update(state, {
            stats: {
                $merge: action.payload
            }
        })
}, {
    health: 0,
    maxHealth: 0,
    serial: 0,
    warMode: false,

    location: {
        x: null,
        y: null,
        z: null,
        direction: null
    },

    body: {
        id: 400,
        hue: 0
    }
});
