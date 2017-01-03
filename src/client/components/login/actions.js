import { createAction } from 'redux-actions-helpers'
import manager from 'package/manager'

export const auth = createAction('@@login/AUTH', ({ username, password }) => ({
    username,
    password
}));

export const error = createAction('@@login/ERROR', ({ error }) => ({
    error
}));

export const confirm = createAction('@@login/CONFIRM');

export const complete = createAction('@@login/COMPLETE');

export const relogin = createAction('@@login/RELOGIN', ({ key }) => ({
    key
}));

export const reloginMaster = (payload) => (dispatch, getState, transport) => {
    dispatch(relogin(payload));

    const state = getState().login;

    const packageSeed = manager.getPackage('seed');
    transport.sendPacket(packageSeed.create(payload.key));

    const packagePostLogin = manager.getPackage(0x91);
    transport.sendPacket(packagePostLogin.create(state.username, state.password, payload.key));
};

export const authMaster = (payout) => (dispatch, getState, transport) => {
    dispatch(auth(payout));

    const packageSeed = manager.getPackage('seed');
    transport.sendPacket(packageSeed.create(getState().connect.ip));

    const packageLoginRequest = manager.getPackage(0x80);
    transport.sendPacket(packageLoginRequest.create(payout.username, payout.password));
};

export default {
    authMaster,
    error,
    confirm,
    complete,
    reloginMaster
}
