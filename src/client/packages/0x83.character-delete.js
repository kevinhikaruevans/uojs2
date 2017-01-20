import { Package, pad } from 'component/helpers'
import { actions as actionsConnect } from 'component/connect'
import { actions as actionsPostLogin } from 'component/post-login'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet83.htm
export default class {

    meta = {
        number  : 0x83,
        name    : 'Account Delete Character',
        length  : 0x0027,
        type    : 'client',
        alias   : [
            'character-delete'
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

    create = (password, index, address) => {
        let result = new Package(39);

        result.append(
            this.numbet || 0x83,
            pad.right(password || '', 30),
            0
        );

        return result;
    }

};
