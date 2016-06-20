import { PacketTypes, MaximumPacketSize } from './constants';
import { StringUtils } from '../utils';

export class Packet {
    constructor(data) {
        this.data = new Uint8Array(data);
        this.position = 0; //TODO seek
    }
    resize(newSize) {
        console.info(`packet.resize called, new size: ${newSize}, current size: ${this.data.length}`);
        /*if (this.data.length <= newSize) {
            return;
        }*/

        newSize = Math.min(newSize, MaximumPacketSize);

        const newBuffer = new Uint8Array(newSize);

        for(let i = 0; i < this.data.length; i++) {
            newBuffer[i] = this.data[i];
        }

        // this probably doesn't do anything:
        //delete this.data;
        this.data = newBuffer;
        this.position = Math.min(newSize - 1, this.position);
    }
    size() {
        return this.data.length;
    }
    getId() {
        return ~~this.data[0];
    }
    getNumber(offset, size) {
        let result = 0;
        for(let i = 0; i < size; i++) {
            result |= (this.data[offset + i] & 0xFF) << (8 * (size - i - 1));
        }
        return result;
    }

    getString(offset, length) {
        let buffer = '';
        for(let i = 0; i < length; i++) {
            buffer += String.fromCharCode(this.data[offset + i]);
        }
        return StringUtils.trim(buffer);
    }

    getByte(offset) {
        return this.getNumber(offset, 1);
    }

    getShort(offset) {
        return this.getNumber(offset, 2);
    }

    getInt(offset) {
        return this.getNumber(offset, 4);
    }

    append() {
        for(let i = 0; i < arguments.length; i++) {
            let arg = arguments[i];
            let t = typeof(arg);

            if (t === 'number') {
                // just assume t is a byte
                this.data[this.position++] = arg & 0xFF;
            } else if (t === 'string') {
                // iterate through the string
                for(let j = 0; j < arg.length; j++) {
                    this.data[this.position++] = arg.charCodeAt(j) & 0xFF;
                }
            } else {
                // unknown type
                throw `cannot append type ${t}`;
            }
        }
    }

    toBuffer() {
        return this.data.buffer;
    }

    toString() {
        if (!this.data.length) {
            return '[Packet: empty]';
        }

        const initialByte = this.data[0];

        if (PacketTypes[initialByte]) {
            return `[Packet: ${PacketTypes[initialByte][0]}]`;
        }
        return `[Packet: Unknown 0x${this.data[0].toString(16)}]`;
    }

    toASCIIString() {
        if (!this.data.length) {
            return '[Packet: empty]';
        }

        const asciiString = Array.prototype.map.call(this.data, x => {
            if (x < 0x7F && x > 0x1F) {
                return String.fromCharCode(x);
            }
            return '?';
        }).join('');

        return `[Packet: "${asciiString}"]`;
    }

    toPrettyString() {
        if (!this.data.length) {
            return '[Packet: empty]';
        }

        const prettyString = Array.prototype.map.call(this.data, x => x.toString(16)).join(', ').toUpperCase();
        const initialByte = this.data[0];
        if (PacketTypes[initialByte]) {
            return `[Packet(${PacketTypes[initialByte][0]}): ${prettyString}]`;
        }
        return `[Packet: ${prettyString}]`;
    }
}
