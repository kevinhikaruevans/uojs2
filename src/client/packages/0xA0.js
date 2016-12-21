import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packeta0.htm
class _0xA0 extends PackageBase {

    constructor() {
        super(0xA0, 0x0003);

        this.description = 'Server Select';
    }

    create = index => {
        const result = new Package(3);
        // @TODO: need fix first 8 bit
        // shard.id is technically a short, but I'm saying it's a byte
        // and padding the first with a zero.
        result.append(this.number, 0, index);

        return result;
    }

}

export default _0xA0;
