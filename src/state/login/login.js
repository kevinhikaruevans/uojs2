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
            this.chooseShard(socket, 0);
        });
        registry.registerPacket(0xA9, (socket, packet) => {
            this.store.dispatch(actions.receiveCharacterList(socket, packet))
            this.chooseCharacter(socket, 0);
        });

        registry.registerPacket(0xBD, (socket) => {
            this.sendVersionString(socket);
        });
        registry.registerPacket(0x8C, (socket, packet) => this.store.dispatch(actions.receiveServerRelay(socket, packet)));
        registry.registerPacket(0x82, (socket, packet) => this.store.dispatch(actions.receiveLoginFailure(socket, packet)));
        registry.registerPacket(0xB9, (socket, packet) => this.store.dispatch(actions.receiveFeatures(socket, packet)));
        registry.registerPacket(0x55, (socket, packet) => this.store.dispatch(actions.receiveLoginCompleted(socket, packet)));
        registry.registerPacket(0x5B, (socket, packet) => this.store.dispatch(actions.receiveTime(socket, packet)));
    }

    chooseCharacter = (socket, characterIndex) => {
        this.store.dispatch(actions.chooseCharacter(socket, characterIndex));
    }

    chooseShard = (socket, shardId) => {
        this.store.dispatch(actions.chooseShard(socket, ~~shardId));
    }

    sendVersionString = (socket) => {
        this.store.dispatch(actions.sendVersionString(socket));
    }
}
