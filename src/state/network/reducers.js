import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

// this sucks and isn't needed
export default handleActions({
    [types.NETWORK_UPDATE_CONNECTION_STATUS]: (state, action) => update(state, {
        connected: { $set: !!action.payload }
    }),
    [types.NETWORK_UPDATE_SEED]: (state, action) => update(state, {
        seed: { $set: action.payload }
    }),

    [types.NETWORK_UPDATE_SENT_LOGIN]: (state, action) => update(state, {
        sentLogin: { $set: action.payload }
    }),

    [types.NETWORK_UPDATE_COMPRESSION]: (state, action) => update(state, {
        compressed: { $set: action.payload }
    }),

    [types.NETWORK_UPDATE_SENT_RELOGIN]: (state, action) => update(state, {
        sentRelogin: { $set: action.payload },
        reconnecting: { $set: action.payload ? false : state.reconnecting }
    }),

    [types.NETWORK_UPDATE_SET_RECONNECTING]: (state, action) => update(state, {
        reconnecting: { $set: action.payload }
    })
}, {
    compressed: false,
    connected: false,
    reconnecting: false,
    sentLogin: false,
    sentRelogin: false,
    seed: []
});
