import { GameSocket } from './network/gamesocket';
import { PacketRegistry } from './network/packetregistry';
import { createStore, applyMiddleware } from 'redux';
import reducers from './state/reducers';
import ReduxThunk from 'redux-thunk';

import { LoginHandler } from './state/login/login';
import { WorldHandler } from './state/world/world';
import { PlayerHandler } from './state/player/player';
import { MobilesHandler } from './state/mobiles/mobiles';

import { Renderer } from './ui/renderer';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
const registry = new PacketRegistry();
const socket = new GameSocket(store, registry);

const handlers = {
    login: new LoginHandler(store, socket),
    world: new WorldHandler(store, socket),
    player: new PlayerHandler(store, socket),
    mobile: new MobilesHandler(store, socket)
};

Object
    .keys(handlers)
    .forEach(handler => handlers[handler].register(registry));

const renderer = new Renderer(document.querySelector('#display'), handlers, store);

store.subscribe(() => {
    const state = store.getState();

    if (!state) {
        return;
    }
    document.querySelector('#output').innerHTML = JSON.stringify(store.getState(), null, 2);

    /*
        the shit below is just trying to "automate" a user.

        once we get a UI or something, then we can remove this, since the users will be invoking the actions.
        right now, it's just like checking where we are in the state, then run certain actions to emulate a user.

        no idea if that makes any sense...
    */
    if (!state.login.user.loggedIn && state.login.user.key && state.network.sentLogin && !state.network.sentRelogin && state.network.connected && !state.network.reconnecting) {
        socket.reconnect({
            key: state.login.user.key
        });
    }
});
