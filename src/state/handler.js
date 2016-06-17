import PacketRegistry from '../network/packetregistry';

export default class Handler
{
    static Key = 'DefaultKey';

    constructor(store) {
        this.store = store;
    }

    register(registry) {
        if (!registry || !(registry instanceof PacketRegistry)) {
            throw 'registry is invalid';
        }
    }
}
