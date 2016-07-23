import { PacketRegistry } from '../network/packetregistry';

export default class Handler
{
    constructor(store, socket) {
        if (!store || !socket) {
            throw 'store or socket is null in the Handler constructor; try calling super(store) in the child class.';
        }
        this.store = store;
        this.socket = socket;
    }

    register(registry) {
        if (!registry || !(registry instanceof PacketRegistry)) {
            throw 'registry is invalid';
        }
    }
}
