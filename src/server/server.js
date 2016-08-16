import * as config from './config';
import { spawn } from 'child_process';
import * as path from 'path';

// so there isn't an exposed api w/ websockify, which means we'll need to just spawn a new process to run it :/

const websockify = spawn('node', [
    path.join('node_modules', 'websockify', 'websockify.js'),
    config.WebsocketPort,
    `${config.GameHost}:${config.GamePort}`
]);

websockify.stdout.on('data', (data) => console.log(data.toString('utf8')));
websockify.stderr.on('data', (data) => console.error(data.toString('utf8')));
websockify.on('close', (code) => {
    console.error(`process closed with code ${code}`);
})
