//import {Packet} from './network/packet';
import { GameSocket } from './network/gamesocket';
import { GlobalState } from './state/globalstate';
import { PacketRegistry } from './network/packetregistry';

const globalState = new GlobalState();
const registry = new PacketRegistry(globalState);
const gameSocket = new GameSocket(registry);
//const p = new Packet([0x65, 0x65, 0x66]);
//console.log('Packet: ', p.toString());
//console.log('number is...', p.getString(0, 3));
