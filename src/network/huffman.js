// poop. i really don't want to implement this again...

import { HuffmanTable, PacketRegistry } from './constants';
import { Packet } from './packet';

class HuffmanDecompression {
    constructor() {
        this.reset();
    }

    reset() {
        this.bit = 0x08;
        this.mask = 0x00;
        this.position = 0;
        this.value = 0;
        this.destination = 0;
        this.estimatedLength = -1;
    }
}
