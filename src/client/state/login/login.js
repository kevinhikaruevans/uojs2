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

        registry.registerPacket(0x8C, (packet) => this.store.dispatch(actions.receiveServerRelay(this.socket, packet)));
        registry.registerPacket(0x55, (packet) => {
            this.store.dispatch(actions.receiveLoginCompleted(this.socket, packet));
            this.store.dispatch(pingActions.sendPing(this.socket));
        });
        registry.registerPacket(0x5B, (packet) => this.store.dispatch(actions.receiveTime(this.socket, packet)));

        registry.registerPacket(0x73, (packet) => this.store.dispatch(pingActions.receivePing(this.socket, packet)));
    }
    loginWithCredentials = (username, password) => {
        this.socket.setCredentials(username, password);
        this.socket.connect();
    }

}
