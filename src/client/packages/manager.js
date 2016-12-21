import debug from 'debug'

import Seed from './seed'
import _0x80 from './0x80'
import _0x8C from './0x8C'

import _0x82 from './0x82'
import _0xA8 from './0xA8'
import _0xA0 from './0xA0'
import _0x91 from './0x91'
import _0xB9 from './0xB9'
import _0xA9 from './0xA9'
import _0x83 from './0x83'
import _0x85 from './0x85'

const log = debug('app:package:manager');

class Manager {

    packages = {};

    constructor() {
        const client = [
            Seed,
            _0x80,
            _0xA0,
            _0x91,
            _0x83
        ];

        const server = [
            _0x82,
            _0xA8,
            _0x8C,
            _0xB9,
            _0xA9,
            _0x85
        ];

        client.forEach(this.registration);
        server.forEach(this.registration);
    }

    getPackage = id => {
        if(this.packages[id]) {
            return this.packages[id];
        } else {
            // @TODO: Normal message error
            console.warn('package not found', id)
        }
    };

    registration = Package => {
        if(typeof Package === 'function') {
            const item = new Package();

            if(item.number) {
                // @TODO: check number
                log('Registration package number %s', item.number);
                this.packages[item.number] = item;
            }

            if(item.alias) {
                item.alias.forEach(key => {
                    // @TODO: check key
                    log('Registration package alias %d -> %s', item.number, key);
                    this.packages[key] = item
                });
            }
        }
    }

}

export default new Manager();
