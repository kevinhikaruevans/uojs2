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
        registry.registerPacket(0xAE, (socket, packet) => this.store.dispatch(actions.receiveUnicodeMessage(socket, packet)));
        registry.registerPacket(0x65, (socket, packet) => this.store.dispatch(actions.receiveWeather(socket, packet)));
        registry.registerPacket(0xBC, (socket, packet) => this.store.dispatch(actions.receiveSeason(socket, packet)));
    }
}
