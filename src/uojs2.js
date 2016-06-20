import { GameSocket } from './network/gamesocket';
import { PacketRegistry } from './network/packetregistry';
import { createStore, applyMiddleware } from 'redux';
import reducers from './state/reducers';
import ReduxThunk from 'redux-thunk';

import { LoginHandler } from './state/login/login';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
//const globalState = new GlobalState();
const registry = new PacketRegistry();

var login = new LoginHandler(store);
login.register(registry);

const gameSocket = new GameSocket(store, registry);

store.subscribe(() => {
    console.log('store updated');
    document.querySelector('#output').innerHTML = JSON.stringify(store.getState(), null, 2);
});

/*
globalState.login.addEventListener('serverlist', (state) => {
    const serverList = state.serverList;
    const shard = serverList[0];
    gameSocket.pickShard(shard);
});

globalState.login.addEventListener('login-failure', (state) => {
    console.log('login failed', state);
});

globalState.login.addEventListener('login-success', (state) => {
    gameSocket.reconnect(state);
    console.log('login success', state);
});*/
