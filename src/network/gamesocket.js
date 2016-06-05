import { Packet } from './packet';
import { StringUtils } from '../utils';
import { PacketRegistry } from './packetregistry';
import { State } from '../state/state';

export class GameSocket {
    constructor(packetRegistry) {
        this.registry = packetRegistry;
        this.connect();
    }
    state = new State({
        sentLogin: false,
        compressed: false,
        connected: false
    });

    connect() {
        const socket = this.socket = new WebSocket('ws://kevinhikaruevans.com:2594', 'binary');
        // tbh, the WebSocket constructor confuses me.
        socket.binaryType = 'arraybuffer';
        socket.onopen = this.open;
        socket.onmessage = this.receive;
        socket.onclose = socket.onerror = this.close;
    }
    reconnect(shard) {
        console.log('reconnect', shard);
        const packet = new Packet(3);
        // shard.id is technically a short, but I'm saying it's a byte
        // and padding the first with a zero.
        packet.append(0xA0, 0, shard.id);
        this.send(packet);
    }
    close = (e) => {
        // update .state?
        this.state.update({
            connected: false
        });

        console.log('closing socket');
    }
    receive = (message) => {
        console.log('message', message);
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

        this.registry.handle(packet);
    }

    open = () => {
        const seed = this.generateSeedPacket();
        this.state.update({
            connected: true,
            seed
        });

        this.send(seed);
        this.login('kevans', 'kevansa');
    }

    login(username, password) {
        const loginPacket = new Packet(62);

        loginPacket.append(
            0x80,
            StringUtils.padRight(username, 30),
            StringUtils.padRight(password, 30),
            0x5D
        );

        this.send(loginPacket);
        this.state.update({
            sentLogin: true
        });
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
