import { createAction } from 'redux-actions-helpers';

import manager from 'package/manager'

export const characterList = createAction('@@character-delete/UPDATE', ({ list, cities }) => ({
    list,
    cities
}));

export const remove = payload => (dispatch, getState, transport) => {
    const _package = manager.getPackage(0x83);

    console.log('HERE');
    // @TODO: params
    transport.sendPacket(_package.create(payload));
};


export default {
    remove
}
