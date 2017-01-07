import { createAction } from 'redux-actions-helpers'
import manager from 'package/manager'

export const update = createAction('@@status-info/UPDATE', (payload) => ({
    ...payload
}));

export const statControl = ({ stat, state }) => (dispatch, getState, transport) => {
    const _package = manager.getPackage(0xBF);
    transport.sendPacket(_package.create(0x1A, {
        stat,
        state
    }));
};

export default {
    update,
    statControl
}
