import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import BrowserRouter from 'react-router-async/browser-router';
import { hookRedux } from 'hook-redux';

import Application from 'component/application';

import { GameSocket } from './network/gamesocket';
import { PacketRegistry } from './network/packetregistry';
import { createStore, applyMiddleware } from 'redux';
import reducers from './state/reducers';
import thunk from 'redux-thunk';

import { LoginHandler } from './state/login/login';
import { WorldHandler } from './state/world/world';
import { PlayerHandler } from './state/player/player';

// @@@@@
import config from 'config'
import Transport from 'core/transport'
import { Package, HuffmanDecompression } from 'component/helpers'
import manager from 'package/manager'

const history = createHistory();

const transport = new Transport({
    host        : config['ws.client.host'],
    port        : config['ws.port'],
    protocol    : 'binary',
    binaryType  : 'arraybuffer'
});

const middleware = [
    thunk.withExtraArgument(transport)
];

if(__DEVELOPMENT__) {
    middleware.push(
        require('redux-logger')({
            duration    : true,
            diff        : true,
            collapsed   : true
        })
    );
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const store = createStoreWithMiddleware(reducers);

// @TODO: GO to app HuffmanDecompression
// need huffman return result
const decompression = new HuffmanDecompression(_package => {
    const item = manager.getPackage(_package.getId());

    if(item) {
        item.action(store, _package);
    }
});

transport.on('message', ({ data }) => {
    if(typeof data === 'object') {
        data = new Uint8Array(data);

        if(store.getState().connect.compression) {
            decompression.receive(data);
        } else {
            data = new Package(data);

            const item = manager.getPackage(data.getId());

            if(item) {
                item.action(store, data);
            }
        }
    }
});

/*

handleMessage = (message) => {
    if (this.state.compressed) {
        this.decompression.receive(message);
        return;
    }
    if (!this.registry) {
        throw 'no handlers available :(';
    }

    const packet = new Packet(new Uint8Array(message.data));
    this.receivePacket(packet);
}
*/


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

console.log(history);

BrowserRouter
    .init({
        path    : history.location.pathname,
        routes  : 'ROUTES',
        hooks   : [
            hookRedux({ dispatch: store.dispatch })
        ],
        history
    })
    .then(({ Router, routerProps, callback }) => {
        render(
            <Provider store={store}>

                <Router {...routerProps} />
{/*
                <Application handlers={handlers} />
*/}
            </Provider>,
            document.getElementById('app'),
            callback
        );
    });
