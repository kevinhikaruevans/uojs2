import { createAction } from 'redux-actions-helpers';

import manager from 'package/manager'

export const characterList = createAction('@@character-list/SET', ({ list, cities }) => ({
    list,
    cities
}));

export const characterDelete = payout => (dispatch, getState, transport) => {
    return new Promise((resolve, reject) => {
        const packageSeed = manager.getPackage(0x83);
        console.log('DELETE')
        transport.sendPacket(packageSeed.create(''));
    });
};


export default {
    characterList,
    characterDelete
}
