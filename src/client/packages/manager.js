import debug from 'debug'

import Seed from './seed'
import _0x80 from './0x80'
import _0x8C from './0x8C'

import LoginFailed from './0x82.login-failed'
import ServerList from './0xA8.server-list'
import ServerSelect from './0xA0.server-select'
import PostLogin from './0x91.post-login'
import Features from './0xB9.features'
import CharacterList from './0xA9.character-list'
import CharacterDelete from './0x83.character-delete'
import _0x85 from './0x85'

const log = debug('app:package:manager');

class Manager {

    packages = {};

    constructor() {
        const client = [
            Seed,
            _0x80,
            ServerSelect,
            PostLogin,
            CharacterDelete
        ];

        const server = [
            LoginFailed,
            ServerList,
            _0x8C,
            Features,
            CharacterList,
            _0x85
        ];

        client.forEach(this.registration);
        server.forEach(this.registration);
    }

    getPackage = id => {
        console.log(this.packages, this.packages[id], id);
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
