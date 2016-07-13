import { Packet } from '../../network/packet';
import * as types from './actionTypes';

import * as flags from './flags';

export const receiveUpdateHealth = (socket, packet) => (dispatch) => {
    const serial = packet.getInt(1);
    const maxHealth = packet.getShort(5);
    const health = packet.getShort(7);

    // ?
    // is this for self or for all mobiles?
};

export const receiveWarMode = (socket, packet) => (dispatch) => {
    const warMode = packet.getByte(1) === flags.WarModeFighting;

    dispatch({
        type: types.USER_UPDATE_WARMODE,
        payload: warMode
    });
};
