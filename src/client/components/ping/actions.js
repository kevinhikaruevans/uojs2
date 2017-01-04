import { createAction } from 'redux-actions-helpers'
import manager from 'package/manager'

export const send = createAction('@@ping/SEND');

export const receive = createAction('@@ping/RECEIVE');

export const changeInterval = createAction('@@ping/CHANGE_INTERVAL', ({ index }) => ({
    index
}));

export const sendMaster = () => (dispatch, getState, transport) => {
    dispatch(send());

    const _package = manager.getPackage(0x73);
    transport.sendPacket(_package.create());
};


export default {
    sendMaster,
    receive,
    changeInterval
}
