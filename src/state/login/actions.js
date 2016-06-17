import * as types from './actionTypes';

export const beginLogin = (socket, username, password) => (dispatch) => {
    console.log('begin login called?');
    console.log(socket, username, password);

    dispatch({
        type: types.LOGIN_WAITING,
        payload: true
    });
}
