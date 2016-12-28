import { Packet } from '../../network/packet';
import { StringUtils } from '../../utils';
import * as types from './actionTypes';
import * as flags from './flags';
//1527
export const receiveObjectInfo = (socket, packet) => (dispatch) => {
    const id = packet.getInt(3);
    const g = packet.getShort(7);
    const serial = id ^ 0x80000000;
};

export const receiveNewObjectSA = (socket, packet) => (dispatch) => {
    packet.begin();

    const newObject = {};
    const first = packet.nextShort();
    const type = packet.nextByte();

    newObject.serial = packet.nextInt();
    newObject.model = packet.nextShort();
    newObject.direction = packet.nextByte();
    newObject.amount = packet.nextShort();
    newObject.amount2 = packet.nextShort();
    newObject.x = packet.nextShort();
    newObject.y = packet.nextShort();
    newObject.z = packet.nextByte();
    newObject.layer = packet.nextByte();
    newObject.hue = packet.nextShort();
    newObject.flag = packet.nextByte();

    if (first !== 1) {
        throw 'dis boy aint right';
    }

    dispatch({
        type: types.WORLD_ADD_OBJECT,
        payload: newObject
    });
};

export const receiveMobileUpdate = (socket, packet) => (dispatch) => {
    packet.begin();
    const mobile = {};
    mobile.serial = packet.nextInt();
    mobile.model = packet.nextShort();
    mobile.x = packet.nextShort();
    mobile.y = packet.nextShort();
    mobile.z = packet.nextByte();
    mobile.direction = packet.nextByte();
    mobile.hue = packet.nextShort();
    mobile.status = packet.nextByte();
    mobile.highlight = packet.nextByte();

    dispatch({
        type: types.WORLD_ADD_OBJECT,
        payload: mobile
    });
};
export const receiveDeleteObject = (socket, packet) => (dispatch) => {
    packet.begin();
    const serial = packet.nextInt();
    dispatch({
        type: types.WORLD_DELETE_OBJECT,
        payload: serial
    });
};
