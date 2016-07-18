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
        })
}, {
    messages: [],
    weather: {
        isRaining: false,
        isSnowing: false,
        temperature: -1,
        particles: 0
    },
    season: {
        flag: null,
        playSound: false
    }
});
