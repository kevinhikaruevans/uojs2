import { createAction } from 'redux-actions-helpers';

import manager from 'package/manager'

export const list = createAction('@@server/LIST', ({ list }) => ({
    list
}));

export const setSelected = createAction('@@server/SET_SELECTED', (index) => ({
    index
}));

export const select = (index) => (dispatch, getState, transport) => {
    dispatch(setSelected(index));

    const packageServerSelect = manager.getPackage(0xA0);
    transport.sendPacket(packageServerSelect.create(index));
};

export default {
    list,
    select,
    setSelected
}
