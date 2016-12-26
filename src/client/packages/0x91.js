import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet91.htm
class _0x91 extends PackageBase {

    constructor() {
        super(0x91, 0x0041);

        this.description = 'Post Login';
    }

    create = (username, password, key) => {
        const result = new Package(this.length);

        result.append(this.number);
        result.writeUINT32(key);
        result.writeCHAR(username, 30);
        result.writeCHAR(password, 30);

        return result;
    }

}

export default _0x91;
