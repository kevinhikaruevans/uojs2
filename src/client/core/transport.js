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

    handleOpen = event => {
        log('Socket open %o', event);
    };

    handleMessage = event => {
        log('Socket message %o', event);

        const message = JSON.parse(event.data);

        const response = this.responseGet(message.uid);

        console.log(response, message);
        if(response) {
            response(message.data)
        }
    };

    handleClose = event => {
        // @TODO: add decryption code message
        log('Socket close code: %d, %o', event.code, event);
    };

    handleError = event => {
        log('Socket error %o', event);
    };

    responseSet = params => {
        if(!this._response) {
            this._response = {}
        }

        if(params.uid && typeof params.response === 'function') {
            this._response[params.uid] = params.response;
        }
    };

    responseGet = uid => {
        let result = null;

        if(this._response && this._response[uid]) {
            result = this._response[uid];
        }

        return result;
    };

    sendObject = (data, response) => {
        if(this._socket.readyState === 1) {
            const uid = this.uid;

            if(typeof response === 'function') {
                this.responseSet({
                    uid,
                    response,
                    type : 'object'
                });
            }

            const message = {
                ...data,
                uid
            };

            this._socket.send(JSON.stringify(message));
        } else {
            // @TODO: connect & send message
        }
    }
}

export default Transport;
