import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/seed.htm
class Seed extends PackageBase {

    constructor() {
        super(null, 0x0004);

        this.description = 'Encrypted Login Seed';
        this.alias = 'seed';
    }

    create = key => {
        let result = null;

        if(key) {
            if(typeof key === 'string') {
                const parse = key.split('.');

                result = parse.map(item => parseInt(item, 10))
            } else if(Array.isArray(key)) {
                result = key;
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

}

export default Seed;
