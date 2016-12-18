import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet80.htm
export default class {

    meta = {
        number  : 0xA0,
        name    : 'Server Select',
        length  : 0x0003,
        type    : 'client',
        alias   : [
            'server-select'
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

    create = index => {
        const result = new Package(3);
        // shard.id is technically a short, but I'm saying it's a byte
        // and padding the first with a zero.
        result.append(this.number, 0, index);

        return result;
    }

};
