import { createAction } from 'redux-actions-helpers';
import manager from 'package/manager'

export const login = createAction('@@post-login/LOGIN', ({ key }) => ({
    key
}));

export const loginMaster = payload => (dispatch, getState, transport) => {
    dispatch(login(payload));

    const state = getState().login;

    const packageSeed = manager.getPackage('seed');
    transport.sendPacket(packageSeed.create(payload.key));

    const packagePostLogin = manager.getPackage(0x91);
    transport.sendPacket(packagePostLogin.create(state.username, state.password, payload.key));
};

export default {
    loginMaster,
    login
}
