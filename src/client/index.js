import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';

import AppComponent from './ui/components/app';

import { GameSocket } from './network/gamesocket';
import { PacketRegistry } from './network/packetregistry';
import { createStore, applyMiddleware } from 'redux';
import reducers from './state/reducers';
import thunk from 'redux-thunk';

import { LoginHandler } from './state/login/login';
import { WorldHandler } from './state/world/world';
import { PlayerHandler } from './state/player/player';


const middleware = [
    thunk
];

if(__DEVELOPMENT__) {
    middleware.push(
        require('redux-logger')({
            duration: true,
            diff    : true
        })
    );
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const store = createStoreWithMiddleware(reducers);
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

render(
    <Provider store={store}>
        <AppComponent handlers={handlers}/>
    </Provider>,
    document.getElementById('app')
);

