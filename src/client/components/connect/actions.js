import { createAction } from 'redux-actions-helpers';

export const connect = createAction('@@connect/CONNECT', (transport, { host, port }) => ({
    transport,
    host,
    port
}));

export const connectSuccess = createAction('@@connect/CONNECT_SUCCESS', ip => ({
    ip
}));

export const connectError = createAction('@@connect/CONNECT_ERROR', error => ({
    error
}));

export default {
    connect,
    connectSuccess,
    connectError
}
