const config = require('./../../configs');
const { connect } = require('net');
const { Server } = require('ws');
const debug = require('debug');

const debugWS = debug('proxy:ws');
const debugNET = debug('proxy:net');

const wss = new Server({
    host : config['ws.host'],
    port : config['ws.port']
});

wss.on('connection', ws => {
  debugWS('connect protocol %s/%s', ws.protocolVersion, ws.protocol);

  const proxy = connect({
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

});




