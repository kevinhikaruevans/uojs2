import {PacketRegistry} from '../network/packetregistry';

export default class Handler
{
    constructor(store) {
        this.store = store;
    }

    register(registry) {
        if (!registry || !(registry instanceof PacketRegistry)) {
            throw 'registry is invalid';
        }
    }
}
