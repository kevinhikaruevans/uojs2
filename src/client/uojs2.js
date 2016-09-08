import { GameSocket } from './network/gamesocket';
import { PacketRegistry } from './network/packetregistry';
import { createStore, applyMiddleware } from 'redux';
import reducers from './state/reducers';
import ReduxThunk from 'redux-thunk';

import { LoginHandler } from './state/login/login';
import { WorldHandler } from './state/world/world';
import { PlayerHandler } from './state/player/player';

//import { Renderer } from './ui/renderer';
import * as ui from './ui/ui';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
const registry = new PacketRegistry();
const socket = new GameSocket(store, registry);

const handlers = {
    login: new LoginHandler(store, socket),
    world: new WorldHandler(store, socket),
    player: new PlayerHandler(store, socket)
};

Object
    .keys(handlers)
    .forEach(handler => handlers[handler].register(registry));

//const renderer = new Renderer(document.querySelector('#display'), handlers, store);
ui.bind(store, handlers);
