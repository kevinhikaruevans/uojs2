import { HuffmanDecompression } from './huffman';
import { Packet } from './packet';
import { StringUtils } from '../utils';
//import { PacketRegistry } from './packetregistry';


export class GameSocket {
    constructor(packetRegistry) {
        this.registry = packetRegistry;
        this.connect();
        this.decompression = new HuffmanDecompression(this.receivePacket);

        this.sentLogin = false;
        this.compressed = false;
        this.connected = false;
    }

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
        this.loginKey = server.key;
        this.connect();
    }

    close = (e) => {
        this.connected = false;
        console.log('closing socket', e);
    }
    receive = (message) => {
        if (this.compressed) {
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
        if (this.sentLogin) {
            this.connected = true;

            const loginKey = this.loginKey;
            this.relogin(loginKey, 'kevans', 'kevans');
        } else {
            this.seed = this.generateSeedPacket();
            this.connected = true;

            this.send(this.seed);
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
        this.sentRelogin = true;
        this.compressed = true;
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
        this.sentLogin = true;
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
