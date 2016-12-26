import { createAction } from 'redux-actions-helpers';

export const setHost = createAction('@@connect/SET_HOST', ({ host }) => ({
    host
}));

export const setPort = createAction('@@connect/SET_PORT', ({ port }) => ({
    port
}));

export const connect = createAction('@@connect/CONNECT');

export const connectSuccess = createAction('@@connect/CONNECT_SUCCESS', ({ ip }) => ({
    ip
}));

export const connectError = createAction('@@connect/CONNECT_ERROR', ({ error }) => ({
    error
}));

export const compressionEnable = createAction('@@connect/COMPRESSION_ENABLE');
export const compressionDisable = createAction('@@connect/COMPRESSION_DISABLE');

export const disconnectMaster = payout => (dispatch, getState, transport) => {
    return new Promise((resolve, reject) => {
        const request = transport.sendObject({
            event : 'disconnect:server'
        });

        request
            .then(
                result => {
                    console.log('DISCONNECT OK')
                    resolve(result);
                },
                error => {
                    console.log('DISCONNECT ERROR')
                    reject(error);
                }
            )

    });
};

export const connectMaster = () => (dispatch, getState, transport) => {
    const { host, port } = getState().connect;

    dispatch(connect());

    return new Promise((resolve, reject) => {
        const request = transport.sendObject({
            event : 'connect:server',
            payout: {
                host,
                port
            }
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
    setHost,
    setPort,
    connectMaster,
    disconnectMaster,
    compressionEnable,
    compressionDisable
}
