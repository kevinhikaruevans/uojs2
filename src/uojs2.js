import { GameSocket } from './network/gamesocket';
import { PacketRegistry } from './network/packetregistry';
import { createStore, applyMiddleware } from 'redux';
import reducers from './state/reducers';
import ReduxThunk from 'redux-thunk';

import { LoginHandler } from './state/login/login';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
const registry = new PacketRegistry();

var login = new LoginHandler(store);
login.register(registry);

const gameSocket = new GameSocket(store, registry);

store.subscribe(() => {
    const state = store.getState();

    if (!state)
        return;
    document.querySelector('#output').innerHTML = JSON.stringify(store.getState(), null, 2);


    // this is SO SHITTY!!!
    if (!state.login.user.loggedIn && state.login.user.key) {
        gameSocket.reconnect({
            key: state.login.user.key
        });
    }
});
