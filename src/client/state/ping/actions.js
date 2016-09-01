import { Packet } from '../../network/packet';
import * as types from './actionTypes';

export const sendPing = (socket) => (dispatch) => {
    const packet = new Packet(2);
    packet.append(0x73, 0x00);

    socket.send(packet);

    dispatch({
        type: types.PING_SEND,
        payload: Date.now()
    });
};

export const receivePing = (socket) => (dispatch, getState) => {
    const state = getState();
    const diff = Date.now() - state.ping.lastSentTime;

    dispatch({
        type: types.PING_UPDATE_LATENCY,
        payload: diff
    });

    setTimeout(() => {
        dispatch(sendPing(socket));
    }, 1000);
};
