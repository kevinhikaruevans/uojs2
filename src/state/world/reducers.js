import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

export default handleActions({
    [types.WORLD_ADD_ASCII_MESSAGE]: (state, action) =>
        update(state, {
            messages: {
                $push: [action.payload]
            }
        }),

    [types.WORLD_REMOVE_ASCII_MESSAGE]: (state, action) =>
        update(state, {
            messages: {
                //TODO:
                $splice: [[state.messages.indexOf(action.payload), 1]]
            }
        })
}, {
    messages: []
});
