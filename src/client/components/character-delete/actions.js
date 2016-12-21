import { createAction } from 'redux-actions-helpers';

import manager from 'package/manager'

export const characterList = createAction('@@character-delete/UPDATE', ({ list, cities }) => ({
    list,
    cities
}));

export const characterDelete = payout => (dispatch, getState, transport) => {
    return new Promise((resolve, reject) => {
        const _package = manager.getPackage('_0x83');

        // @TODO: params
        transport.sendPacket(_package.create(''));
    });
};


export default {
    characterList,
    characterDelete
}
