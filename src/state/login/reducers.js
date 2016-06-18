import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

export default handleActions({
    [types.LOGIN_SERVERLIST]: (state, action) =>
        update(state, {
            servers: {
                list: { $push: action.payload }
            }
        }),

    [types.LOGIN_SELECT_SHARD]: (state, action) =>
        update(state, {
            servers: {
                selected: { $set: action.payload }
            }
        }),

    [types.LOGIN_FAILURE]: (state, action) =>
        update(state, {
            user: {
                error: { $set: action.payload }
            }
        }),

    [types.LOGIN_SERVER_RELAY]: (state, action) =>
        update(state, {
            user: {
                key: { $set: action.payload }
            }
        }),

    [types.LOGIN_RECV_CHAR_LIST]: (state, action) =>
        update(state, {
            user: {
                characters: { $set: action.payload }
            }
        })
}, {
    user: {
        loggedIn: false,
        error: null,
        username: null,
        key: null,
        characters: null
    },
    servers: {
        list: [],
        selected: -1
    }
});
