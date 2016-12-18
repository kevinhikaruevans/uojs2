import { createAction } from 'redux-actions-helpers';
import manager from 'package/manager'

export const select = createAction('@@server-select/SELECT', index => ({
    index
}));

export const selectMaster = index => (dispatch, getState, transport) => {
    dispatch(select(index));

    const packageServerSelect = manager.getPackageClient('server-select');
    transport.sendPacket(packageServerSelect.create(index));
};


export default {
    selectMaster
}
