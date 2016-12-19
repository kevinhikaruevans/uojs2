import { actions } from 'component/features'

// http://necrotoolz.sourceforge.net/kairpacketguide/packetb9.htm
export default class {

    meta = {
        number  : 0xB9,
        name    : 'Features',
        length  : 0x0003,
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
        dispatch(
            actions.features({
                flag : _package.getInt(1)
            })
        );
    }

};
