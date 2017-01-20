import { createAction } from 'redux-actions-helpers';

import manager from 'package/manager'

export const characterList = createAction('@@character-delete/UPDATE', ({ list, cities }) => ({
    list,
    cities
}));

export const characterDelete = payout => (dispatch, getState, transport) => {
    return new Promise((resolve, reject) => {
        const packageSeed = manager.getPackageClient('character-delete');
        console.log('DELETE')
        transport.sendPacket(packageSeed.create(''));
    });
};


export default {
    characterList,
    characterDelete
}
