import PackageBase from 'core/package-base'
import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet83.htm
class _0x83 extends PackageBase {

    constructor() {
        super(0x83, 0x0027);

        this.description = 'Account Delete Character';
    }

    create = (password, index, address) => {
        let result = new Package(39);

        // @TODO: IP address & index
        result.append(
            this.numbet,
            pad.right(password || '', 30),
            0
        );

        return result;
    }

}

export default _0x83;
