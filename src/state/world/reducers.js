import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

export default handleActions({
    [types.WORLD_ADD_MESSAGE]: (state, action) =>
        update(state, {
            messages: {
                $push: [action.payload]
            }
        }),

    [types.WORLD_REMOVE_MESSAGE]: (state, action) =>
        update(state, {
            messages: {
                // remove one, perhaps we should add a $unpush extension
                // see: update.extend('$unpush', (item, original) => ...)
                $splice: [[state.messages.indexOf(action.payload), 1]]
            }
        }),

    [types.WORLD_UPDATE_SEASON]: (state, action) =>
        update(state, {
            season: {
                $merge: action.payload
            }
        }),

    [types.WORLD_UPDATE_WEATHER]: (state, action) =>
        update(state, {
            weather: {
                $merge: action.payload
            }
        }),

    [types.WORLD_UPDATE_LIGHT]: (state, action) =>
        update(state, {
            light: {
                level: {
                    $set: action.payload
                }
            }
        }),

    [types.WORLD_UPDATE_MAP]: (state, action) =>
        update(state, {
            map: {
                $merge: action.payload
            }
        })
}, {
    messages: [],
    // still deciding if these should be handled here or in a different subobject:
    items: [],
    mobiles: [],
    map: {
        id: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0
    },
    weather: {
        isRaining: false,
        isSnowing: false,
        temperature: 0,
        particles: 0
    },
    light: {
        level: 0
    },
    season: {
        flag: null,
        playSound: false
    }
});
