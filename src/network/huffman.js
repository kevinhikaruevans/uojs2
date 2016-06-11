console.log('huffman loaded');
import { HuffmanTable, HuffmanEOF, PacketTypes } from './constants';
import { Packet } from './packet';
export class HuffmanDecompression {
    constructor(receivePacket) {
        this.receivePacket = receivePacket;
        this.reset();
    }

    receive = (message) => {
        const data = new Uint8Array(message.data);
        let i = 0;
        while (i < data.length) {
            if (this.bit >= 0x08) {
                this.value = data[i++];
                this.bit = 0;
                this.mask = 0x80;
            }

            // trying to look up a position in the tree that isn't defined
            if (HuffmanTable[this.position] === undefined) {
                throw 'undefined tree position... fuck.';
                // should break?
            }
            else {
                this.position = HuffmanTable[this.position][(this.value & this.mask) ? 1 : 0];
            }

            this.mask >>= 1;
            this.bit++;

            if (this.position <= 0) {
                const completedByte = -this.position;
                if (this.position === HuffmanEOF || this.estimatedLength === this.destination.position) {
                    //TODO check if packet.length >= estlength
                    // packet is full/completely decompressed
                    this.receivePacket(this.destination);
                    this.reset(false);
                    continue;
                }

                if (i > data.length) {
                    // wat
                    throw 'tried to access index greater than source length';
                }

                if (this.destination.index === 0) {
                    const packetType = PacketTypes[completedByte];
                    // completed the first byte
                    if (type !== undefined) {
                        // it's a valid first packet (thank god)
                        this.estimatedLength = packetType[1];

                        if (this.estimatedLength) {
                            // resize the array to the estimated length
                            this.destination.resize(this.estimatedLength);
                        } else {
                            console.info('it is a valid packet, but the estimated length is infinite');
                        }
                    } else {
                        // AHHHHHHHHHHH
                        throw 'you fucked up; packet is not valid bro';
                    }
                }

                if (this.estimatedLength === -1 && this.destination.position === 3) {
                    this.estimatedLength = this.destination.getShort(1);
                    this.destination.resize(this.estimatedLength);
                }

                this.destination.append(completedByte);
                this.position = 0;
            }
        }
    }

    reset(fullReset = true) {
        this.bit = 0x08;
        this.position = 0;
        this.destination = new Packet(3);
        this.estimatedLength = -1;

        if (this.fullReset) {
            this.mask = 0x00;
            this.value = 0;
        }
    }
}
