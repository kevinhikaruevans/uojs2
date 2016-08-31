import Handler from '../handler';
import * as actions from './actions';
import * as pingActions from '../ping/actions';

export class LoginHandler
    extends Handler
{
    constructor(store, socket) {
        super(store, socket);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0xA8, (packet) => {
            this.store.dispatch(actions.receiveServerlist(this.socket, packet));
            this.chooseShard(0);
        });
        registry.registerPacket(0xA9, (packet) => {
            this.store.dispatch(actions.receiveCharacterList(this.socket, packet))
            //this.chooseCharacter(0);
        });

        registry.registerPacket(0xBD, () => {
            this.sendVersionString(this.socket);
        });
        registry.registerPacket(0x8C, (packet) => this.store.dispatch(actions.receiveServerRelay(this.socket, packet)));
        registry.registerPacket(0x82, (packet) => this.store.dispatch(actions.receiveLoginFailure(this.socket, packet)));
        registry.registerPacket(0xB9, (packet) => this.store.dispatch(actions.receiveFeatures(this.socket, packet)));
        registry.registerPacket(0x55, (packet) => {
            this.store.dispatch(actions.receiveLoginCompleted(this.socket, packet));
            this.store.dispatch(pingActions.sendPing(this.socket));
        });
        registry.registerPacket(0x5B, (packet) => this.store.dispatch(actions.receiveTime(this.socket, packet)));
        registry.registerPacket(0x73, (packet) => this.store.dispatch(actions.receivePing(this.socket, packet)));
    }
    loginWithCredentials = (username, password) => {
        this.socket.setCredentials(username, password);
        this.socket.connect();
    }

    chooseCharacter = (characterIndex) => {
        this.store.dispatch(actions.chooseCharacter(this.socket, characterIndex));
    }

    chooseShard = (shardId) => {
        this.store.dispatch(actions.chooseShard(this.socket, ~~shardId));
    }

    sendVersionString = () => {
        this.store.dispatch(actions.sendVersionString(this.socket));
    }
}
