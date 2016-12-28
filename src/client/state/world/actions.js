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

export const receiveGeneralInformation = (socket, packet) => (dispatch) => {
    packet.begin();
    const subcommand = packet.nextShort();

    console.info('general info packet, subcommand: ', subcommand);

    switch(subcommand) {
        default:
            {
                console.warn('unknown subcommand', subcommand);
            }
            break;
        case 0x01:
            {
                console.info('initialize fast walk... no idea how this works really');
            }
            break;

        case 0x04:
            {
                console.log('force close gump');
            }
            break;

        case 0x05:
            {
                packet.nextShort();
                const width = packet.nextShort();
                const height = packet.nextShort();
                console.log('screen size: ', width, height);
            }
            break;

        case 0x08:
            {
                const mapType = packet.nextByte();
                dispatch({
                    type: types.WORLD_UPDATE_MAP,
                    payload: {
                        id: mapType
                    }
                })
            }
    }
};

// 0x78 "draw object"
export const receiveNewObject = (socket, packet) => (dispatch) => {
    console.log('receiveNewObject', packet.toPrettyString());

    packet.begin();

    const newObject = {};
    newObject.serial = packet.nextInt();
    newObject.model = packet.nextShort();
    newObject.x = packet.nextShort();
    newObject.y = packet.nextShort();
    newObject.z = packet.nextByte();
    newObject.direction = packet.nextByte();
    newObject.hue = packet.nextShort();
    newObject.flag = packet.nextByte();
    newObject.notoriety = packet.nextByte();

    let wearableSerial = packet.nextInt();

    if (wearableSerial) {
        newObject.layers = [];
        while (wearableSerial) {
            const layer = { serial: wearableSerial };
            layer.model = packet.nextShort();
            layer.layer = packet.nextByte();
            if (layer.model & 0x8000) {
                layer.hue = packet.nextShort();
            }
            newObject.layers.push(layer);
            wearableSerial = packet.nextInt();
        }
    }

    dispatch({
        type: types.WORLD_ADD_OBJECT,
        payload: newObject
    });
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
