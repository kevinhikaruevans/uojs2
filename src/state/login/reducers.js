import * as types from './actionTypes';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';

export default handleActions({
    [types.LOGIN_WAITING]: (state, action) => {
        console.log('LOGIN_WAITING reducer called!');
        return update(state, {
            pending: {$set: action.payload}
        });
    }
}, {
    pending: false
});
