import PackageBase from 'core/package-base'
import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet80.htm
class _0x80 extends PackageBase {

    constructor() {
        super(0x80, 0x003E);

        this.description = 'Account Login Request';
    }

    create = (username, password, NextLoginKey) => {
        let result = new Package(62);

        result.append(
            this.numbet,
            pad.right(username, 30),
            pad.right(password, 30),
            NextLoginKey || 0x5D
        );

        return result;
    }

}

export default _0x80;
