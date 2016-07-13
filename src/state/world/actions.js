import { Packet } from '../../network/packet';
import * as types from './actionTypes';

export const receiveObjectInfo = (socket, packet) => (dispatch) => {
    const id = packet.getInt(3);
    const g = packet.getShort(7);
    const serial = id ^ 0x80000000;
};

export const receiveAsciiMessage = (socket, packet) => (dispatch) => {
    packet.begin();
    const serial = packet.nextInt();
    const model = packet.nextShort();
    const type = packet.nextByte();
    const color = packet.nextShort();
    const font = packet.nextShort();
    const name = packet.nextString(30).trim();
    const message = packet.nextString(packet.variableSize - 44).trim();
    const asciiMessage = {
        serial,
        model,
        type,
        color,
        font,
        name,
        message
    };

    console.error(asciiMessage);
    dispatch({
        type: types.WORLD_ADD_ASCII_MESSAGE,
        payload: asciiMessage
    });

    setTimeout(() => {
        // it's probably better to have a single timer, then add in each
        // callback + a delay or something, unless if that's already what the browser does...
        // will look into that
        dispatch({
            type: types.WORLD_REMOVE_ASCII_MESSAGE,
            payload: asciiMessage
        })
    }, 10000);
};
