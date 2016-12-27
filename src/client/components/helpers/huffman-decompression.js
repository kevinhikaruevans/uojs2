import { HuffmanTable, HuffmanEOF, PacketTypes } from './../../network/constants';
import Package from './package';

export default class HuffmanDecompression {
    constructor(receivePacket) {
        this.receivePacket = receivePacket;
    }

    static getBit(buffer, bit) {
        return (buffer >> (bit - 1)) & 1;
    }

    receive = data => {
        // This was adapted from UltimaXNA's huffman decompression:
        // https://github.com/ZaneDubya/UltimaXNA/blob/master/dev/Core/Network/Compression/HuffmanDecompression.cs
        let node = 0;
        let bit = 0x08;
        let i = 0;

        if (!this.destination) {
            this.destination = new Package(0x800);
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
                        console.log(data);
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
        const type = PacketTypes[dest.getByte(0)] || [];
        console.log(`receive > 0x${dest.getByte(0).toString(16)} > ${type[0]}`);
        this.receivePacket(dest);

        this.destination = new Package(3);
    }
}
