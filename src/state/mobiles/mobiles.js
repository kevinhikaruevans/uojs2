import Handler from '../handler';
import * as actions from './actions';

export class MobilesHandler
    extends Handler
{
    constructor(store) {
        super(store);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0x11, (socket, packet) => this.store.dispatch(actions.receiveMobileStats(socket, packet)));
    }
}
