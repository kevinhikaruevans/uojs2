import Handler from '../handler';
import * as actions from './actions';

export class UserHandler
    extends Handler
{
    constructor(store) {
        super(store);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0x72, (socket, packet) => this.store.dispatch(actions.receiveWarMode(socket, packet)));
    }
}
