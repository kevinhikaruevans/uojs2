import Handler from '../handler';
import * as actions from './actions';

export class WorldHandler
    extends Handler
{
    constructor(store, socket) {
        super(store, socket);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0xF3, (packet) => this.store.dispatch(actions.receiveNewObjectSA(this.socket, packet)));
        registry.registerPacket(0x1D, (packet) => this.store.dispatch(actions.receiveDeleteObject(this.socket, packet)));
        registry.registerPacket(0x77, (packet) => this.store.dispatch(actions.receiveMobileUpdate(this.socket, packet)));
    }
}
