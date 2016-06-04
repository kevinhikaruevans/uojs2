class PacketRegistry {
    constructor() {
        this.registry = {};
    }

    registerPacket(packet) {
        // TODO: this should be a WeakMap
        this.registry[packet.id] = packet;
    }
}
