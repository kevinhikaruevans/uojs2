import { HuffmanDecompression } from './huffman';
import { Packet } from './packet';
import { StringUtils } from '../utils';
import { PacketRegistry } from './packetregistry';
import { State } from '../state/state';

export class GameSocket {
    constructor(packetRegistry) {
        this.registry = packetRegistry;
        this.connect();
        this.decompression = new HuffmanDecompression(this.receivePacket);
    }
    state = new State({
        sentLogin: false,
        compressed: false,
        connected: false
    });

    connect() {
        const socket = this.socket = new WebSocket('ws://167.88.112.167:2594', 'binary');
        // tbh, the WebSocket constructor confuses me.
        socket.binaryType = 'arraybuffer';
        socket.onopen = this.open;
        socket.onmessage = this.receive;
        socket.onclose = socket.onerror = this.close;
    }

    reconnect(server) {
        console.log('reconnect', server);
        console.warn(`this should connect to ${server.address}:${server.port}, but I can't. :( it's not a big deal, since we'll connect to the same server as the login server`);
        this.state.update({
            loginKey: server.key
        });
        this.connect();
    }

    pickShard(shard) {
        console.log('pick shard', shard);
        const packet = new Packet(3);
        // shard.id is technically a short, but I'm saying it's a byte
        // and padding the first with a zero.
        packet.append(0xA0, 0, shard.id);
        this.send(packet);
    }
    close = (e) => {
        this.state.update({
            connected: false
        });

        console.log('closing socket');
    }
    receive = (message) => {
        console.log('message', message);
        if (this.state.get('compressed')) {
            this.decompression.receive(message);
            return;
            //throw 'compression is not handled yet';
        }
        if (!this.registry) {
            throw 'no handlers available :(';
        }

        const packet = new Packet(new Uint8Array(message.data));
        this.receivePacket(packet);
    }
    receivePacket = (packet) => {
        console.log('received packet:');
        console.log(packet.toPrettyString());
        console.log(packet.toASCIIString());
        console.log('---------------------------------------');
        this.registry.handle(this, packet);
    }
    open = () => {
        // this is shitty and NEEDS to be refactored.
        // maybe look at a flux implementation.
        if (this.state.get('sentLogin')) {
            this.state.update({
                connected: true
            });

            const loginKey = this.state.get('loginKey');
            console.log('login key', loginKey);
            //this.send(loginKey);
            this.relogin(loginKey, 'kevans', 'kevans');
        } else {
            const seed = this.generateSeedPacket();
            this.state.update({
                connected: true,
                seed
            });

            this.send(seed);
            this.login('kevans', 'kevans');
        }
    }
    relogin(loginKey, username, password) {
        this.send(new Packet(loginKey));
        const loginKeyPacket = new Packet(65);
        loginKeyPacket.append(
            0x91,
            loginKey[0],
            loginKey[1],
            loginKey[2],
            loginKey[3],
            StringUtils.padRight(username, 30),
            StringUtils.padRight(password, 30)
        );
        this.send(loginKeyPacket);

        this.state.update({
            sentRelogin: true,
            // I don't know if this is actually true or not, but it seems to be
            // the case in most instances...
            compressed: true
        });
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
