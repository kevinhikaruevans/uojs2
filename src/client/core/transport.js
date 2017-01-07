import debug from 'debug'

const log = debug('app:core:transport');

class Transport {

    get uid() {
        if(!this._uid) {
            this._uid = 0;
        }

        return ++this._uid;
    }

    constructor(options = {}) {
        if(!options.host) {
            console.error('Options host undefined: %s', options.host)
        }

        if(!options.port) {
            console.error('Options port undefined: %s', options.port)
        }

        if(!options.protocol) {
            options.protocol = []
        }

        this._socket = new WebSocket(`ws://${options.host}:${options.port}`, options.protocol);

        if(options.binaryType) {
            this._socket.binaryType = options.binaryType;
        }

        this._socket.addEventListener('open', this.handleOpen);
        this._socket.addEventListener('message', this.handleMessage);
        this._socket.addEventListener('close', this.handleClose);
        this._socket.addEventListener('error', this.handleError);
    }

    on = (event, fn) => {
        if(typeof event === 'string' && typeof fn === 'function') {
            this._socket.addEventListener(event, fn);
        } else {
            // @TODO: normal error
            console.log('Error');
        }
    };

    off = (event, fn) => {
        if(typeof event === 'string' && typeof fn === 'function') {
            this._socket.removeEventListener(event, fn);
        } else {
            // @TODO: normal error
            console.log('Error');
        }
    };

    handleOpen = (event) => {
        log('Socket open %o', event);
    };

    handleMessage = (event) => {
        log('Socket message %o', event);

    };

    handleClose = (event) => {
        // @TODO: add decryption code message
        log('Socket close code: %d, %o', event.code, event);
    };

    handleError = (event) => {
        log('Socket error %o', event);
    };

    sendObject = (data) => {
        return new Promise((resolve, reject) => {
            if(this._socket.readyState === 1) {
                const uid = this.uid;

                const message = {
                    ...data,
                    uid
                };

                const once = (message) => {
                    if(typeof message.data === 'string') {
                        const data = JSON.parse(message.data);

                        if(uid === data.uid) {
                            if(data.error) {
                                reject(data.error);
                            } else {
                                resolve(data.payout);
                            }

                            this._socket.removeEventListener('message', once);
                        }
                    }
                };

                this._socket.addEventListener('message', once);
                this._socket.send(JSON.stringify(message));
            } else {
                // @TODO: return normal error message
                reject(this._socket.readyState)
            }
        });
    };

    sendPacket = (data) => {
        this._socket.send(data.toBuffer());
    }
}

export default Transport;
