import { Package } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/seed.htm
export default class {

    meta = {
        number  : null,
        name    : 'Encrypted Login Seed',
        length  : 0x0004,
        type    : 'client',
        alias   : [
            'seed'
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

    create = ip => {
        let result = null;

        if(ip) {
            if(typeof ip === 'string') {
                const parse = ip.split('.');

                result = parse.map(item => parseInt(item, 10))
            }
        } else {
            result = [
                ~~(Math.random() * 0x40),
                ~~(Math.random() * 0xFF),
                ~~(Math.random() * 0xFF),
                ~~(Math.random() * 0xFF)
            ]
        }

        return new Package(result);
    }

};
