import { GameSocket } from './network/gamesocket';
import { GlobalState } from './state/globalstate';
import { PacketRegistry } from './network/packetregistry';
import reducers from './state/reducers';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import { LoginHandler } from './state/login/login';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
//const globalState = new GlobalState();
const registry = new PacketRegistry();

var login = new LoginHandler(store);
login.register(registry);

const gameSocket = new GameSocket(registry);

store.subscribe(() => {
    console.log('thing is', store.getState());
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
