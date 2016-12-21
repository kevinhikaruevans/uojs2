import PackageBase from 'core/package-base'
import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet91.htm
class _0x91 extends PackageBase {

    constructor() {
        super(0x91, 0x0041);

        this.description = 'Post Login';
    }

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

}

export default _0x91;
