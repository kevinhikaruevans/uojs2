import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet80.htm
class _0x80 extends PackageBase {

    constructor() {
        super(0x80, 0x003E);

        this.description = 'Account Login Request';
    }

    create = (username, password, NextLoginKey) => {
        let result = new Package(this.length);

        result.append(this.number);
        result.writeCHAR(username, 30);
        result.writeCHAR(password, 30);
        result.append(NextLoginKey || 0x5D);

        return result;
    }

}

export default _0x80;
