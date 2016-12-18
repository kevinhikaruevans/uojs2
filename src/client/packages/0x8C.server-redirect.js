import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet8c.htm
export default class {

    meta = {
        number  : 0x8C,
        name    : 'Server Redirect',
        length  : 0x000B,
        type    : 'server',
        alias   : []
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
