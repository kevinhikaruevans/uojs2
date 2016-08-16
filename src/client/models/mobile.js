import { Packet } from '../network/packet';

export default class Mobile {
    constructor(packet) {
        if (!(packet instanceof Packet)) {
            throw 'cannot init mobile w/o base packet';
        }
    }
};
