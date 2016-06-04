import { Packet } from './packet';

export class Socket {
    constructor() {
        const socket = this.socket = new WebSocket('ws://kevinhikaruevans.com:2594', 'binary');

        socket.onopen = this.open;
    }


    receive = (data) => {

    }
    open = () => {
        console.log('the socket is opened! let\'s send a ping now...');

        const initialPing = new Packet([0x73, 0x00]);
        this.send(initialPing);
    }

    send(packet) {
        console.log('attempting to send packet', packet);
        if (packet && packet instanceof Packet) {
            console.log('packet', packet.toBuffer());
            this.socket.send(packet.toBuffer());
        } else if (packet instanceof Array) {
            throw 'cannot send Arrays at this time';
        } else {
            console.error('failed to send');
            throw 'attempted to send an incorrectly formatted packet';
        }
    }

    beginClientHandshake() {

    }
}
