import { createAction } from 'redux-actions-helpers';

export const connect = createAction('@@connect/CONNECT', ({ host, port }) => ({
    host,
    port
}));

export const connectSuccess = createAction('@@connect/CONNECT_SUCCESS', ({ ip }) => ({
    ip
}));

export const connectError = createAction('@@connect/CONNECT_ERROR', ({ error }) => ({
    error
}));

export const connectMaster = payout => (dispatch, getState, transport) => {
    dispatch(connect(payout));

    return new Promise((resolve, reject) => {
        const request = transport.sendObject({
            event : 'connect:server',
            payout
        });

        request
            .then(
                result => {
                    dispatch(connectSuccess(result));
                    resolve(result);
                },
                error => {
                    error = { error };

                    dispatch(connectError(error));
                    reject(error);
                }
            )

    });
};

export default {
    connectMaster
}
