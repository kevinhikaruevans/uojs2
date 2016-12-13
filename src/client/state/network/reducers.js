import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

// this sucks and isn't needed
export default handleActions({
    [types.NETWORK_UPDATE_CONNECTION_STATUS]: (state, action) => update(state, {
        // $merge it?
        connected: { $set: !!action.payload.connected },
        connecting: { $set: !!action.payload.connecting },
        error: { $set: action.payload.error }
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
        reconnecting: { $set: action.payload ? false : state.reconnecting },
        error: { $set: null }
    }),

    [types.NETWORK_UPDATE_SET_RECONNECTING]: (state, action) => update(state, {
        reconnecting: { $set: action.payload },
        error: { $set: null }
    }),

    [types.NETWORK_DISMISS_ERROR]: (state) => update(state, {
        error: { $set: null }
    })
}, {
    compressed: false,
    connected: false,
    connecting: false,
    error: null,
    reconnecting: false,
    sentLogin: false,
    sentRelogin: false,
    seed: []
});
