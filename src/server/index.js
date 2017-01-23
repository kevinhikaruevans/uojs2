require('./env');

const config = require('./../../configs');
const { connect } = require('net');
const { Server } = require('ws');
const debug = require('debug')('proxy:ws');
const uodatareader = require('uodatareader')({
    baseDirectory: config['uo.directory'],
    maps: [
//        {fileIndex: 0, mapId: 0, width: 6144, height: 4096},
        {fileIndex: 0, mapId: 1, width: 6144, height: 4096}
    ]
});
const wss = new Server({
    host : config['ws.server.host'],
    port : config['ws.port']
});

const Proxy = require('./socket');

wss.on('connection', ws => {
    debug('Connect protocol %s/%s', ws.protocolVersion, ws.protocol);

    ws.on('message', message => {
        debug('Message length %d, type %s', message.length, typeof message);

        switch(typeof message) {
            case 'string':
                const { event, payout, uid } = JSON.parse(message);

                switch(event) {
                    case 'connect:server':
                        const server = Proxy.connect(payout);

                        server.then(
                            socket => {
                                ws.send(JSON.stringify({
                                    uid,
                                    event,
                                    error   : null,
                                    payout  : {
                                        ip : ws.upgradeReq.connection.remoteAddress
                                    }
                                }));

                                socket.on('data', buffer => ws.send(buffer, { binary: true }));
                                // @TODO: readyState error
                                // socket.on('close', ws.close);
                            },
                            error => {
                                ws.send(JSON.stringify({
                                    uid,
                                    event,
                                    error
                                }));
                            }
                        );
                        break;
                    case 'disconnect:server':
                        if(Proxy) {
                            Proxy.socket.on('close', hadError => {
                                ws.send(JSON.stringify({
                                    uid,
                                    event,
                                    hadError
                                }));
                            });
                            Proxy.end();
                        }
                        break;

                    case 'map:tiles':
                        const { x, y, id, size } = payout;
                        const map = uodatareader.maps[id];
                        console.time('Request' + id);
                        console.log(map, id, x, y, size);
                        const block = map ? map.getTiles(x, y, size) : [];
                        console.timeEnd('Request' + id);
                        //console.log('block', block);
                        debug('Map block request (%d, %d) -> length: %d', x, y, block.length);

                        ws.send(JSON.stringify({
                            uid,
                            event,
                            payout : block
                        }));
                        break;
                }
                break;
            case 'object':
                Proxy.send(message);
                break;
        }

    });

    ws.on('close', () => {
        debug('closed');

        Proxy.end();
    });

    ws.on('error', error => {
        debug('error: %s', error);

        Proxy.end();
    });
});
