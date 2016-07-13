import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

export default handleActions({
    [types.USER_UPDATE_HEALTH]: (state, action) =>
        update(state, {
            health: { $set: action.payload.health },
            maxHealth: { $set: action.payload.maxHealth }
        }),

    [types.USER_UPDATE_WARMODE]: (state, action) =>
        update(state, {
            warMode: { $set: action.payload }
        })
}, {
    health: 0,
    maxHealth: 0,
    serial: 0,
    warMode: false
});
