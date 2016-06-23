import Handler from '../handler';
import * as actions from './actions';

export class LoginHandler
    extends Handler
{
    constructor(store) {
        super(store);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0xA8, (socket, packet) => {
            this.store.dispatch(actions.receiveServerlist(socket, packet));
            this.store.dispatch(actions.chooseShard(socket, 0));
        });

        registry.registerPacket(0x8C, (socket, packet) => this.store.dispatch(actions.receiveServerRelay(socket, packet)));
        registry.registerPacket(0x82, (socket, packet) => this.store.dispatch(actions.receiveLoginFailure(socket, packet)));
        registry.registerPacket(0xA9, (socket, packet) => this.store.dispatch(actions.receiveCharacterList(socket, packet)));
        registry.registerPacket(0xB9, (socket, packet) => this.store.dispatch(actions.receiveFeatures(socket, packet)));
    }
}
