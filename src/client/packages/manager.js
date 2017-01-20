import Seed from './seed'
import LoginRequest from './0x80.login-request'
import LoginFailed from './0x82.login-failed'
import ServerList from './0xA8.server-list'
import ServerSelect from './0xA0.server-select'
import ServerRedirect from './0x8C.server-redirect'
import PostLogin from './0x91.post-login'
import Features from './0xB9.features'
import CharacterList from './0xA9.character-list'
import CharacterDelete from './0x83.character-delete'
import _0x85 from './0x85'

class Manager {

    packages = {
        client : {},
        server : {}
    };

    constructor() {
        const client = [
            Seed,
            LoginRequest,
            ServerSelect,
            PostLogin,
            CharacterDelete
        ];

        const server = [
            LoginFailed,
            ServerList,
            ServerRedirect,
            Features,
            CharacterList,
            _0x85
        ];

        client.forEach(this.registration);
        server.forEach(this.registration);
    }

    getPackage = (type, id) => {
        if(this.packages[type][id]) {
            return this.packages[type][id];
        } else {
            // @TODO: Normal message error
            console.warn('package not found', id)
        }
    };

    getPackageClient = id => this.getPackage('client', id);

    getPackageServer = id => this.getPackage('server', id);

    registration = Package => {
        if(typeof Package === 'function') {
            const item = new Package();

            if(item.number) {
                // @TODO: check number
                this.packages[item.type][item.number] = item;
            }

            if(item.alias) {
                item.alias.forEach(key => {
                    // @TODO: check key
                    this.packages[item.type][key] = item
                });
            }
        }
    }

}

export default new Manager();
