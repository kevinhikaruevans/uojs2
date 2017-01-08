import { createAction } from 'redux-actions-helpers'
import manager from 'package/manager'

export const update = createAction('@@status-info/UPDATE', (payload) => ({
    ...payload
}));

export const requestState = createAction('@@status-info/REQUEST_STATE');

export const updateState = createAction('@@status-info/UPDATE_STATE', (payload) => ({
    payload
}));

export const changeState = createAction('@@status-info/CHANGE_STATE', (payload) => ({
    payload
}));

export const requestStateMaster = () => (dispatch, getState, transport) => {
    const serial = getState().player.serial;
    const _package = manager.getPackage(0x34);

    // @TODO: need ?
    dispatch(requestState({ serial }));

    transport.sendPacket(
            _package.create(0x04, serial)
    );
};

export const changeStateMaster = (payload) => (dispatch, getState, transport) => {
    dispatch(changeState(payload));

    const _package = manager.getPackage(0xBF);
    transport.sendPacket(
        _package.create(0x1A, payload)
    );
};

export default {
    update,
    changeStateMaster,
    updateState,
    requestStateMaster
}
