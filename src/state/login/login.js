import Handler from '../handler';
import * as actions from './actions';

export class LoginHandler extends Handler {
    constructor(store) {
        super(store);
    }

    register(registry) {
        super.register(registry);

        registry.registerPacket(0xA8, (socket, packet) => {
            console.log('got an A8');
            
            this.store.dispatch(
                actions.beginLogin(socket, 'test', 'test')
            );
        });
    }
}
