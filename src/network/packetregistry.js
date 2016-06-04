import { Packet } from './packet';
import { GlobalState } from '../state/globalstate';

export class PacketRegistry {
    constructor(globalState) {
        this.registry = {};

        globalState.register(this);
    }

    registerPacket(packetId, handler) {
        this.registry[packetId] = handler;
    }

    executeHandler(packet) {
        if (packet instanceof Packet) {
            const id = packet.getId();

            this.registry[id](packet);
        }
    }
}
