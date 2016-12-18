import { actions as actionsLogin } from 'component/login'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet82.htm
export default class {

    meta = {
        number  : 0x82,
        name    : 'Account Login Failed',
        length  : 0x0002,
        type    : 'server',
        alias   : []
    };

    // @TODO: i18n
    message = {
        0 : 'Incorrect name/password',
        1 : 'Someone is already using this account',
        2 : 'Your account is blocked',
        3 : 'Your account credentials are invalid',
        4 : 'Communication problem',
        5 : 'IGR concurrency limit met',
        6 : 'IGR time limit met',
        7 : 'General IGR failure',
        99: 'Unknown login issue'
    };

    // Create base class
    get number() {
        return this.meta.number;
    }

    get name() {
        return this.meta.name;
    }

    get length() {
        return this.meta.length;
    }

    get alias() {
        return this.meta.alias;
    }

    get type() {
        return this.meta.type
    }
    // -------------

    /*
     depending on the server used (particularly runuo/servuo), this packet
     might not even exist. there is a bug in these servers that causes the packet
     to not get written to the stream. the socket closes (on their end) before
     its flushed.
     */
    action = ({ dispatch }, _package) => {
        let error = this.message[99];

        if(this.message[_package.getByte(1)]) {
            error = this.message[_package.getByte(1)];
        }

        dispatch(
            actionsLogin.error({
                error
            })
        );
    }

};
