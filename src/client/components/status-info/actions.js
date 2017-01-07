import { createAction } from 'redux-actions-helpers'
import manager from 'package/manager'

export const update = createAction('@@status-info/UPDATE', (payload) => ({
    ...payload
}));

export const request = createAction('@@status-info/REQUEST');

export const sendType = createAction('@@status-info/SEND_TYPE');

export const typeMaster = () => (dispatch, getState, transport) => {
    const _package = manager.getPackage(0xBF);

    transport.sendPacket(_package.create(0x0F, {
        flag : getState().statusInfo.flag
    }));

    // @TODO: ???
    dispatch(sendType())
};

export const requestMaster = () => (dispatch, getState, transport) => {
    const serial = getState().player.serial;
    const _package = manager.getPackage(0x34);

    // @TODO: need ??????????
    dispatch(request({ serial }));

    transport.sendPacket(
        _package.create(0x04, serial)
    );
};


export const statControl = ({ stat, state }) => (dispatch, getState, transport) => {
    const _package = manager.getPackage(0xBF);
    transport.sendPacket(_package.create(0x1A, {
        stat,
        state
    }));
};

export default {
    update,
    statControl,
    typeMaster,
    requestMaster
}
