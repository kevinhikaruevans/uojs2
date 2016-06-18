import { PacketRegistry } from '../network/packetregistry';

export default class Handler
{
    constructor(store) {
        if (!store) {
            throw 'store is null in the Handler constructor; try calling super(store) in the child class.';
        }
        this.store = store;
    }

    register(registry) {
        if (!registry || !(registry instanceof PacketRegistry)) {
            throw 'registry is invalid';
        }
    }
}
