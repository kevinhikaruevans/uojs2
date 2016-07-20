import { HuffmanTable, HuffmanEOF, PacketTypes } from './constants';
import { Packet } from './packet';

export class HuffmanDecompression {
    constructor(receivePacket) {
        this.receivePacket = receivePacket;
        this.reset();
    }

    static getBit(buf, bit) {
        return (buf >> (bit - 1)) & 1;
    }

    receive = (message) => {
        // This was adapted from UltimaXNA:
        // https://github.com/ZaneDubya/UltimaXNA/blob/master/dev/Core/Network/Compression/HuffmanDecompression.cs
        const data = new Uint8Array(message.data);
        let node = 0;
        let bit = 0x08;
        let i = 0;

        if (!this.destination) {
            this.destination = new Packet(3);
        }
        while (i < data.length) {
            const leaf = HuffmanDecompression.getBit(data[i], bit);
            let leafValue = HuffmanTable[node][leaf];

            if (leafValue === HuffmanEOF) {
                i++;
                this.finish();
                node = 0;
                bit = 0x08;
                continue;
            }

            if (leafValue < 1) {
                const value = ~~(-leafValue);
                this.destination.append(value);

                if (this.destination.position === 1 || this.destination.position === 3) {
                    const packetType = PacketTypes[this.destination.data[0]];

                    // completed the first byte
                    if (packetType !== undefined) {
                        // it's a valid first packet
                        const estimatedLength = packetType[1];

                        if (estimatedLength === -1 && this.destination.position === 3) {
                            this.destination.resize(this.destination.getShort(1));
                        } else if (estimatedLength > 0 && this.destination.position === 1) {
                            this.destination.resize(estimatedLength);
                        }

                    } else {
                        console.error('unknown packet');
                        console.error(this.destination.clone());
                    }
                }
                leafValue = 0;
            }
            bit--;
            node = leafValue;

            if (bit < 1) {
                bit = 0x08;
                i++;
            }
        }

        if (this.destination.data[0]) {
            console.info(`decompressed an incomplete packet: ${this.destination.data[0]}`);
        }
    }


    finish = () => {
        const dest = this.destination.clone();
        console.log(`receive > 0x${dest.getByte(0).toString(16)}`);
        this.receivePacket(dest);

        this.destination = new Packet(3);
    }
    // shitty version:
    receive_old = (message) => {
        const data = new Uint8Array(message.data);
        let i = 0;
        let preventInitialReset = this.destination && this.destination.position > 0;

        console.log(`decompress > 0x${this.destination.getByte(0).toString(16)}`);
        //console.log('need to decompress a message, current packet: ', this.destination.data[0].toString(16), this.destination);

        //console.log(`length: ${this.destination.position} est: ${this.estimatedLength}`);

        while (i < data.length) {
            if (this.bit >= 0x08) {
                // should this get reset for each message?
                this.value = data[i++];
                this.bit = 0;
                this.mask = 0x80;
                //console.log('preventInitialReset = ' + preventInitialReset);
            }
            preventInitialReset = false;
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
                if (this.position === HuffmanEOF /*|| this.estimatedLength === this.destination.position*/) {
                    //TODO check if packet.length >= estlength
                    // packet is full/completely decompressed
                    //this.receivePacket(this.destination);
                    //console.info('fin^1');
                    //console.log('index', i, data.length);
                    //console.log('pos', this.destination.position);
                    //console.log('est len', this.estimatedLength);
                    this.finish();
                    this.reset(true);
                    continue;
                }

                if (i > data.length) {
                    // wat
                    throw 'tried to access index greater than source length';
                }

                if (this.destination.position === 0) {
                    const packetType = PacketTypes[completedByte];
                    // completed the first byte
                    if (packetType !== undefined) {
                        // it's a valid first packet (thank god)
                        this.estimatedLength = packetType[1];

                        if (this.estimatedLength > 0) {
                            //console.info(`packet type: 0x${completedByte.toString(16)}, estimated length: ${this.estimatedLength}`);
                            // resize the array to the estimated length
                            this.destination.resize(this.estimatedLength);
                        } else {
                            //console.info(`packet appears valid, but make sure it's a valid variable length packet: 0x${completedByte.toString(16)}`);
                        }
                    } else {
                        // AHHHHHHHHHHH
                        // might get thrown if possibly the unicode data of 0xae causes a size issue when it reads the packet
                        throw `invalid packet? 0x${completedByte.toString(16)}`;
                    }
                }

                if (this.estimatedLength === -1 && this.destination.position === 3) {
                    this.estimatedLength = this.destination.getShort(1);
                    //console.log('we now have enough data to resize the variable-length packet');
                    //console.info(`packet length *appears* to be ${newSize}`);
                    this.destination.resize(this.estimatedLength);
                }

                this.destination.append(completedByte);
                this.position = 0;
            }
        }
        if (this.destination.position > 0) {
            //console.log('packet');
            if (this.destination.position + 1 === this.estimatedLength || this.destination.position === this.estimatedLength) {
                this.finish();
                this.reset(true);
            } else {
                console.info('did not decompress completely (aka got an incomplete packet)');
                console.info(this.destination);
                console.log('pos = ', this.destination.position);
                console.log('est = ', this.estimatedLength);
                //this.position = 0;
                //this.bit = 0x08;
            }
        }
    }

    reset(fullReset = true) {
        //console.log(`reset huffman state, full reset: ${fullReset}`);
        this.bit = 0x08;
        this.position = 0;
        this.destination = new Packet(3);
        this.estimatedLength = -1;

        if (fullReset) {
            this.mask = 0x00;
            this.value = 0;
        }
    }
}
