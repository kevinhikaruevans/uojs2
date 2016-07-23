import * as types from './actionTypes';

export const setConnected = (value) => (dispatch) => {
    dispatch({
        type: types.NETWORK_UPDATE_CONNECTION_STATUS,
        payload: value
    })
};

export const setSeed = (value) => (dispatch) => {
    dispatch({
        type: types.NETWORK_UPDATE_SEED,
        payload: value
    })
};

export const setSentLogin = (value) => (dispatch) => {
    dispatch({
        type: types.NETWORK_UPDATE_SENT_LOGIN,
        payload: value
    });
};

export const setCompression = (value) => (dispatch) => {
    dispatch({
        type: types.NETWORK_UPDATE_COMPRESSION,
        payload: value
    });
};

export const setSentRelogin = (value) => (dispatch) => {
    dispatch({
        type: types.NETWORK_UPDATE_SENT_RELOGIN,
        payload: value
    });
};

export const setReconnecting = (value) => (dispatch) => {
    dispatch({
        type: types.NETWORK_UPDATE_SET_RECONNECTING,
        payload: value
    });
};
