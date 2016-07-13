import Handler from '../handler';
import * as actions from './actions';

export class WorldHandler
    extends Handler
{
    constructor(store) {
        super(store);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0x1C, (socket, packet) => this.store.dispatch(actions.receiveAsciiMessage(socket, packet)));
    }
}
