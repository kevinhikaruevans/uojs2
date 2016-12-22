import PackageBase from 'core/package-base'
import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet83.htm
class _0x83 extends PackageBase {

    constructor() {
        super(0x83, 0x0027);

        this.description = 'Account Delete Character';
    }

    create = ({ index, password, ip }) => {
        let result = new Package(this.length);

        // @TODO: IP address & index
        result.append(
            this.number,
            pad.right(password || '', 30)
        );

        result.writeUINT32(index);
        result.writeUINT32(ip.split('.'));

        return result;
    }

}

export default _0x83;
