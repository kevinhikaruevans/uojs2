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

        registry.registerPacket(0x11, (socket, packet) => this.store.dispatch(actions.receiveMobileStatus(socket, packet)));
        //registry.registerPacket(0x78, (socket, packet) => this.store.dispatch(actions.receiveMobileIncomming(socket, packet)));
        registry.registerPacket(0xF3, (socket, packet) => {
            console.log(packet.toASCIIString());
        });
    }
}
