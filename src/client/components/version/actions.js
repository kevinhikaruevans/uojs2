import { createAction } from 'redux-actions-helpers';

import manager from 'package/manager'

export const set = createAction('@@version/SET', ({ index }) => ({
    index
}));

export const send = () => (dispatch, getState, transport) => {
    const state = getState().version;
    const _package = manager.getPackage(0xBD);

    transport.sendPacket(
        _package.create(state.list[state.selected])
    );
};


export default {
    send,
    set
}
