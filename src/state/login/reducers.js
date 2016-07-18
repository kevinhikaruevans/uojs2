import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

export default handleActions({
    [types.LOGIN_UPDATE_SERVERLIST]: (state, action) =>
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

    [types.LOGIN_UPDATE_CHAR_LIST]: (state, action) =>
        update(state, {
            user: {
                characters: { $set: action.payload }
            }
        }),

    [types.LOGIN_UPDATE_SERVER_FEATURES]: (state, action) =>
        update(state, {
            user: {
                loggedIn: { $set: true }
            },
            currentServer: {
                features: { $set: action.payload }
            }
        }),

    [types.LOGIN_CHOOSE_CHAR]: (state, action) => update(state, {
        user: {
            chosenCharacterIndex: { $set: action.payload }
        }
    }),

    [types.LOGIN_SENT_VERSION]: (state, action) => update(state, {
        currentServer: {
            sentVersion: { $set: action.payload }
        }
    }),

    [types.LOGIN_COMPLETED]: (state) => update(state, {
        currentServer: {
            loginCompleted: { $set: true }
        }
    }),

    [types.LOGIN_UPDATE_TIME]: (state, action) => update(state, {
        currentServer: {
            time: {
                $merge: action.payload
            }
        }
    })
}, {
    user: {
        loggedIn: false,
        error: null,
        username: null,
        key: null,
        characters: null,
        chosenCharacterIndex: null
    },
    servers: {
        list: [],
        selected: -1
    },
    currentServer: {
        features: 0,
        sentVersion: null,
        loginCompleted: false,
        time: {
            offset: 0,
            loginTime: '00:00:00'
        }
    }
});
