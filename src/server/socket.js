const { connect } = require('net');
const debug = require('debug')('server:net');

const config = require('./../../configs');

class Socket {

    constructor() {
        this.socket = null;

        this.end = this.end.bind(this);
        this.send = this.send.bind(this);
        this.clean = this.clean.bind(this);
        this.connect = this.connect.bind(this);
    }

    clean() {
        this.socket = null;
    }

    end() {
        this.socket && this.socket.end();
    }

    send(message) {
        this.socket && this.socket.write(message);
    }

    connect(params) {
        return new Promise((resolve, reject) => {
            this.socket && this.end();

            this.socket = connect(params);

            this.socket.setTimeout(config['net.timeout']);

            this.socket.on('connect', () => {
                debug('Socket connect %s:%s', params.host, params.port);

                this.socket.setTimeout(0);

                resolve(this.socket);
            });

            this.socket.on('close', hadError => {
                debug('Socket close. Had error: %s', hadError);

                this.clean();
            });

            this.socket.on('data', buffer => debug('Socket data length %s', buffer.length));
            this.socket.on('drain', () => debug('Socket drain'));
            this.socket.on('end', () => debug('Socket end'));
            this.socket.on('error', error => {
                debug('Socket error %o', error);

                reject(error);
            });
            this.socket.on('lookup', (error, address, family, host) => {
                console.log('lookup', error, address, family, host)
            });
            this.socket.on('timeout', () => {
                debug('Socket timeout');

                this.end();

                reject({
                    code : null,
                    message : 'Timeout'
                });
            });
        })
    }

}

module.exports = new Socket();
