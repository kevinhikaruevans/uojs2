import { createAction } from 'redux-actions-helpers';
import manager from 'package/manager'

export const login = createAction('@@post-login/LOGIN', ({ key }) => ({
    key
}));

export const loginMaster = payload => (dispatch, getState, transport) => {
    dispatch(login(payload));

    const state = getState().login;

    const packageSeed = manager.getPackageClient('seed');
    transport.sendPacket(packageSeed.create(payload.key));

    const packagePostLogin = manager.getPackageClient('post-login');
    transport.sendPacket(packagePostLogin.create(state.username, state.password, payload.key));
};

export default {
    loginMaster,
    login
}
