import {Packet} from './network/packet';

const p = new Packet([0x65, 0x65, 0x66]);

console.log('number is...', p.getString(0, 3));
