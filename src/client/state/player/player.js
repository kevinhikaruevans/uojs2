import Handler from '../handler';
import * as actions from './actions';

export class PlayerHandler
    extends Handler
{
    constructor(store, socket) {
        super(store, socket);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0x72, (packet) => this.store.dispatch(actions.receiveWarMode(this.socket, packet)));
        registry.registerPacket(0x1B, (packet) => this.store.dispatch(actions.receiveLocationWithBody(this.socket, packet)));
        registry.registerPacket(0x20, (packet) => this.store.dispatch(actions.receiveGamePlayer(this.socket, packet)));
    }

    sendMessage(message) {

    }
}
