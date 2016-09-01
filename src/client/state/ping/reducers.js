import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

export default handleActions({
    [types.PING_SEND]: (state, action) => update(state, {
        lastSentTime: {
            $set: action.payload
        }
    }),

    [types.PING_UPDATE_LATENCY]: (state, action) => update(state, {
        latency: {
            $set: action.payload
        }
    })
}, {
    lastPingTime: 0,
    latency: 0
});
