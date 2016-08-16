import Handler from '../handler';
import * as actions from './actions';

export class MobilesHandler
    extends Handler
{
    constructor(store, socket) {
        super(store, socket);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0x11, (packet) => this.store.dispatch(actions.receiveMobileStatus(this.socket, packet)));
        //registry.registerPacket(0x78, (socket, packet) => this.store.dispatch(actions.receiveMobileIncomming(socket, packet)));
        registry.registerPacket(0xF3, (packet) => {
            console.log(packet.toASCIIString());
        });
    }
}
