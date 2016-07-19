import Handler from '../handler';
import * as actions from './actions';

export class PlayerHandler
    extends Handler
{
    constructor(store) {
        super(store);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0x72, (socket, packet) => this.store.dispatch(actions.receiveWarMode(socket, packet)));
        registry.registerPacket(0x1B, (socket, packet) => this.store.dispatch(actions.receiveLocationWithBody(socket, packet)));
        registry.registerPacket(0x20, (socket, packet) => this.store.dispatch(actions.receiveGamePlayer(socket, packet)));
    }
}
