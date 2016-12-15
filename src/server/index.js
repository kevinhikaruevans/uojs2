require('./env');

const config = require('./../../configs');
const { connect } = require('net');
const { Server } = require('ws');
const debug = require('debug');
const debugWS = debug('proxy:ws');
const debugNET = debug('proxy:net');

const wss = new Server({
    host : config['ws.server.host'],
    port : config['ws.port']
});

wss.on('connection', ws => {
    debugWS('connect protocol %s/%s', ws.protocolVersion, ws.protocol);

    let proxy = null;

    ws.on('message', message => {
        debugWS('message length %d, type %s', message.length, typeof message);

        if(typeof message === 'string') {
            const { event, data, uid } = JSON.parse(message);

            if(event === 'connect:server' && !proxy) {
                // @TODO: check host & port
                proxy = connect({
                    host : data.host,
                    port : data.port
                }, () => debugNET('connect %s:%s', data.host, data.port));

                proxy.on('data', buffer => {
                    debugNET('data length %s', buffer.length);

                    ws.send(buffer, { binary: true });
                });

                proxy.on('end', () => {
                    debugNET('end connect');

                    proxy = null;
                });

                proxy.on('error', error => {
                    debugNET('error: %s', error);

                    ws.send(JSON.stringify({
                        uid,
                        data : error
                    }));

                    // @TODO: need method
                    if(proxy) {
                        proxy.end();
                        proxy = null;
                    }
                });
            }
        } else {
            proxy && proxy.write(message);
        }
    });

    ws.on('close', () => {
        debugWS('closed');

        // @TODO: need method
        if(proxy) {
            proxy.end();
            proxy = null;
        }
    });

    ws.on('error', error => {
        debugWS('error: %s', error);

        // @TODO: need method
        if(proxy) {
            proxy.end();
            proxy = null;
        }
    });
  /*const proxy = connect({
      host : config['net.host'],
      port : config['net.port']
  }, () => debugNET('connect %s:%s', config['net.host'], config['net.port']));

    proxy.on('data', buffer => {
        debugNET('data length %s', buffer.length);

        ws.send(buffer, { binary: true });
    });

    proxy.on('end', () => {
        debugNET('end connect');

        ws.close()
    });

    proxy.on('error', error => {
        debugNET('error: %s', error);

        proxy.end();
        ws.close();
    });

    ws.on('message', message => {
        debugWS('message length %s', message.length);

        proxy.write(message);
    });

    ws.on('close', () => {
        debugWS('closed');

        proxy.end()
    });

    ws.on('error', error => {
        debugWS('error: %s', error);

        proxy.end()
    });
*/
});
