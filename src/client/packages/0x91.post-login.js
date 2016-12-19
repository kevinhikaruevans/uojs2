import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet80.htm
export default class {

    meta = {
        number  : 0x91,
        name    : 'Post Login',
        length  : 0x0041,
        type    : 'client',
        alias   : [
            'post-login'
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

    create = (username, password, key) => {
        const result = new Package(65);

        result.append(
            this.number,
            key[0],
            key[1],
            key[2],
            key[3],
            pad.right(username, 30),
            pad.right(password, 30)
        );

        return result;
    }

};
