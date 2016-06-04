import { PacketTypes } from './constants';

export class Packet {
    constructor(data) {
        this.data = new Uint8Array(data);
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
        return buffer;
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

    toBuffer() {
        console.log('toBuffer called!', this.data.buffer);
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
}
