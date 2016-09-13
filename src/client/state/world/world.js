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

        registry.registerPacket(0x1C, (packet) => this.store.dispatch(actions.receiveAsciiMessage(this.socket, packet)));
        registry.registerPacket(0xAE, (packet) => this.store.dispatch(actions.receiveUnicodeMessage(this.socket, packet)));
        registry.registerPacket(0x65, (packet) => this.store.dispatch(actions.receiveWeather(this.socket, packet)));
        registry.registerPacket(0xBC, (packet) => this.store.dispatch(actions.receiveSeason(this.socket, packet)));
        registry.registerPacket(0x4F, (packet) => this.store.dispatch(actions.receiveWorldLightLevel(this.socket, packet)));

        registry.registerPacket(0x78, (packet) => this.store.dispatch(actions.receiveNewObject(this.socket, packet)));
        registry.registerPacket(0xF3, (packet) => this.store.dispatch(actions.receiveNewObjectSA(this.socket, packet)));
        registry.registerPacket(0x1D, (packet) => this.store.dispatch(actions.receiveDeleteObject(this.socket, packet)));
        registry.registerPacket(0x11, (packet) => this.store.dispatch(actions.receiveMobileStatus(this.socket, packet)));
        registry.registerPacket(0x77, (packet) => this.store.dispatch(actions.receiveMobileUpdate(this.socket, packet)));
    }
}
