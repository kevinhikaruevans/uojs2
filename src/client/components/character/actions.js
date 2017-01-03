import { createAction } from 'redux-actions-helpers';

import manager from 'package/manager'

export const list = createAction('@@character/LIST', ({ list, cities }) => ({
    list,
    cities
}));

export const update = createAction('@@character/LIST_UPDATE', ({ list }) => ({
    list
}));

export const removeAction = createAction('@@character/REMOVE_ACTION', ({ index }) => ({
    index
}));

export const removeError = createAction('@@character/REMOVE_ERROR', ({ code, message }) => ({
    code,
    message
}));

export const remove = ({ index, password }) => (dispatch, getState, transport) => {
    dispatch(
        removeAction({ index })
    );

    const _package = manager.getPackage(0x83);

    transport.sendPacket(
        _package.create({
            index,
            password,
            ip : getState().connect.ip
        })
    );
};

export const create = (payload) => (dispatch, getState, transport) => {
    const _package = manager.getPackage(0x00);

    console.log(payload);

    transport.sendPacket(
        _package.create({
            username : null,
            password : null,
            key      : getState().login.key
        })
    );
};

export const selected = ({ name, password, slot }) => (dispatch, getState, transport) => {
    const _package = manager.getPackage(0x5D);
    transport.sendPacket(
        _package.create({
            name,
            password,
            slot,
            key : getState().login.key
        })
    );
};


export default {
    remove,
    removeError,
    list,
    update,
    create,
    selected
}
