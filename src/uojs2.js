import {Packet} from './network/packet';
import {Socket} from './network/socket';

const socket = new Socket();
const p = new Packet([0x65, 0x65, 0x66]);
console.log('Packet: ', p.toString());
//console.log('number is...', p.getString(0, 3));
