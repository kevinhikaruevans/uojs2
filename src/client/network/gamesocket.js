import { HuffmanDecompression } from './huffman';
import { Packet } from './packet';
import { StringUtils } from '../utils';
import * as networkActions from '../state/network/actions';

export class GameSocket {
    constructor(store, packetRegistry) {
        this.store = store;
        this.registry = packetRegistry;
        this.decompression = new HuffmanDecompression(this.receivePacket);
        //this.connect();
    }

    get state() {
        return this.store.getState().network;
    }

    connect() {
        if (this.socket) {
            try {
                this.socket.close();
            }
            catch(e) {
                console.error(e);
            }
        }
        this.store.dispatch(networkActions.setConnected(false));
        const socket = this.socket = new WebSocket('ws://192.168.1.124:2594', 'binary');

        socket.binaryType = 'arraybuffer';
        socket.onopen = this.handleOpen;
        socket.onmessage = this.handleMessage;
        socket.onclose = this.handleClose;
        socket.onerror = this.handleError;
    }

    reconnect(server) {
        this.store.dispatch(networkActions.setReconnecting(true));
        this.loginKey = server.key;
        this.connect();
    }

    handleError = (error) => {
        console.error(error);
        this.handleClose();
    }

    handleClose = () => {
        console.info('socket closed');
        this.store.dispatch(networkActions.setConnected(false));
    }

    handleMessage = (message) => {
        if (this.state.compressed) {
            this.decompression.receive(message);
            return;
        }
        if (!this.registry) {
            throw 'no handlers available :(';
        }

        const packet = new Packet(new Uint8Array(message.data));

      console.log('aaaaaaaaaaaa', new Uint8Array(message.data), message, packet);
      this.receivePacket(packet);
    }

    handleOpen = () => {
        this.store.dispatch(networkActions.setConnected(true));

        if (this.state.sentLogin) {
            const loginKey = this.loginKey;
            this.relogin(loginKey);
        } else {
            const seed = this.generateSeedPacket();
            this.store.dispatch(networkActions.setSeed(seed.toArray()));
            this.send(seed);
            this.login();
        }
    }

    receivePacket = (packet) => {
        this.registry.handle(packet);
    }
    setCredentials = (username, password) => {
        this.username = username;
        this.password = password;
    }
    relogin = (loginKey) => {
        this.send(new Packet(loginKey));

        const loginKeyPacket = new Packet(65);
        loginKeyPacket.append(
            0x91,
            loginKey[0],
            loginKey[1],
            loginKey[2],
            loginKey[3],
            StringUtils.padRight(this.username, 30),
            StringUtils.padRight(this.password, 30)
        );
        this.send(loginKeyPacket);

        this.store.dispatch(networkActions.setSentRelogin(true));
        this.store.dispatch(networkActions.setCompression(true));

        delete this.username;
        delete this.password;
    }

    login() {
        const loginPacket = new Packet(62);

        loginPacket.append(
            0x80,
            StringUtils.padRight(this.username, 30),
            StringUtils.padRight(this.password, 30),
            0x5D
        );

        this.send(loginPacket);
        this.store.dispatch(networkActions.setSentLogin(true));
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
        /*if (!this.state.connected) {
            throw Error('socket is not connected (yet?)');
        }*/

        if (packet && packet instanceof Packet) {
            console.log('send > ' + packet.toString());
            this.socket.send(packet.toBuffer());
        } else if (packet instanceof Array) {
            throw 'cannot send Arrays at this time. wrap it in a packet.';
        } else {
            console.error('failed to send');
            throw 'attempted to send an incorrectly formatted packet';
        }
    }
}
