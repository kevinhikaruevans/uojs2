import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet80.htm
export default class {

    meta = {
        number  : 0x80,
        name    : 'Account Login Request',
        length  : 0x003E,
        type    : 'client',
        alias   : [
            'login-request'
        ]
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

    create = (username, password, NextLoginKey) => {
        let result = new Package(62);

        result.append(
            this.numbet || 0x80,
            pad.right(username, 30),
            pad.right(password, 30),
            NextLoginKey || 0x5D
        );

        return result;
    }

};
