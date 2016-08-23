import { Packet } from './packet';

export class PacketRegistry {
    constructor() {
        this.registry = {};
    }

    registerPacket(packetId, handler) {
        this.registry[packetId] = handler;
    }

    canHandle(packet) {
        return !!this.registry[packet.getId()];
    }

    handle(packet) {
        if (packet instanceof Packet) {
            const id = packet.getId();
            if (this.registry[id]) {//use canhandle?
                this.registry[id](packet);
            } else {
                console.warn(`wuh-oh, we got an unregistered packet: 0x${id.toString(16)}`);
            }
        } else {
            throw 'handler called for non packet';
        }
    }
}
