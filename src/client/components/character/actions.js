import { createAction } from 'redux-actions-helpers';

import manager from 'package/manager'

export const remove = payload => (dispatch, getState, transport) => {
    const _package = manager.getPackage(0x83);
    transport.sendPacket(
        _package.create({
            index   : payload.index,
            password: payload.password,
            ip      : getState().connect.ip
        })
    );
};

export const create = payload => (dispatch, getState, transport) => {
/*    const _package = manager.getPackage(0x83);
    transport.sendPacket(
        _package.create({
            index   : payload.index,
            password: payload.password,
            ip      : getState().connect.ip
        })
    );*/
};


export default {
    remove
}
