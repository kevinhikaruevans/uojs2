import { Packet } from './packet';
import { StringPad } from '../utils';
import { PacketRegistry } from './packetregistry';

export class GameSocket {
    constructor(packetRegistry) {
        const socket = this.socket = new WebSocket('ws://kevinhikaruevans.com:2594', 'binary');
        // tbh, the WebSocket constructor confuses me.
        socket.binaryType = 'arraybuffer';
        socket.onopen = this.open;
        socket.onmessage = this.receive;

        //this.registry = new PacketRegistry();
        this.registry = packetRegistry;
    }

    state = {
        sentLogin: false,
        compressed: false
    }

    receive = (message) => {
        if (this.state.compressed) {
            throw 'compression is not handled yet';
        }
        if (!this.registry) {
            throw 'no handlers available :(';
        }
        const packet = new Packet(new Uint8Array(message.data));

        console.log('received packet:');
        console.log(packet.toPrettyString());
        console.log(packet.toASCIIString());
        console.log('---------------------------------------');

        this.registry.executeHandler(packet);
    }

    open = () => {
        this.connected = true;
        this.seed = this.generateSeedPacket();

        this.send(this.seed);
        this.login('kevans', 'kevans');
    }

    login(username, password) {
        const loginPacket = new Packet(62);

        loginPacket.append(
            0x80,
            StringPad(username, 30),
            StringPad(password, 30),
            0x5D
        );

        this.send(loginPacket);
        this.state.sentLogin = true;
    }

    generateSeedPacket() {
        return new Packet([
            ~~(Math.random() * 0x40),
            ~~(Math.random() * 0xFF),
            ~~(Math.random() * 0xFF),
            ~~(Math.random() * 0xFF)
        ]);
    }
    send(packet) {
        if (packet && packet instanceof Packet) {
            console.log('sending packet:');
            console.log(packet.toPrettyString());
            console.log(packet.toASCIIString());
            console.log('---------------------------------------');
            this.socket.send(packet.toBuffer());
        } else if (packet instanceof Array) {
            throw 'cannot send Arrays at this time';
        } else {
            console.error('failed to send');
            throw 'attempted to send an incorrectly formatted packet';
        }
    }
}
