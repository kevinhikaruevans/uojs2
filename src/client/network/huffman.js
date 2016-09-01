import { HuffmanTable, HuffmanEOF, PacketTypes } from './constants';
import { Packet } from './packet';

export class HuffmanDecompression {
    constructor(receivePacket) {
        this.receivePacket = receivePacket;
    }

    static getBit(buffer, bit) {
        return (buffer >> (bit - 1)) & 1;
    }

    receive = (message) => {
        // This was adapted from UltimaXNA's huffman decompression:
        // https://github.com/ZaneDubya/UltimaXNA/blob/master/dev/Core/Network/Compression/HuffmanDecompression.cs
        const data = new Uint8Array(message.data);
        let node = 0;
        let bit = 0x08;
        let i = 0;

        if (!this.destination) {
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
                        /*console.error('unknown packet');
                        console.error(this.destination.clone());
                        if (this.destination.position === 3) {
                            this.destination.resize(this.destination.getShort(1));
                        }*/
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
}
