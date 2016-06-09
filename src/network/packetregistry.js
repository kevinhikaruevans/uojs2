import { Packet } from './packet';
import { GlobalState } from '../state/globalstate';

export class PacketRegistry {
    constructor(globalState) {
        this.registry = {};

        globalState.register(this);
    }

    registerPacket(packetId, handler) {
        this.registry[packetId] = handler;

        console.log('registerPacket', packetId);
        console.log(this.registry);
    }
    canHandle(packet) {
        return !!this.registry[packet.getId()];
    }
    handle(packet) {
        if (packet instanceof Packet) {
            const id = packet.getId();
            if (this.registry[id]) {
                this.registry[id](packet);
            } else {
                console.warn(`wuh-oh, we got an unregistered packet: 0x${id.toString(16)}`);
            }
        } else {
            throw 'handler called for non packet';
        }
    }
}
