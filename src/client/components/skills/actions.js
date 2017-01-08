import { createAction } from 'redux-actions-helpers';

import manager from 'package/manager'

export const request = createAction('@@skills/REQUEST', ({ serial }) => ({
    serial
}));

export const requestMaster = () => (dispatch, getState, transport) => {
    const serial = getState().player.serial;
    const _package = manager.getPackage(0x34);

    dispatch(request({ serial }));

    transport.sendPacket(
        _package.create(0x05, serial)
    );
};


export default {
    requestMaster
}
