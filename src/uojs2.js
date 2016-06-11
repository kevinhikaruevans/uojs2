import { GameSocket } from './network/gamesocket';
import { GlobalState } from './state/globalstate';
import { PacketRegistry } from './network/packetregistry';

const globalState = new GlobalState();
const registry = new PacketRegistry(globalState);
const gameSocket = new GameSocket(registry);

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
});
