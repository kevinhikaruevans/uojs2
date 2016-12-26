import PackageBase from 'core/package-base'
import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet5d.htm
class _0x5D extends PackageBase {

    constructor() {
        super(0x5D, 0x0049);

        this.description = 'Pre Login';
    }

    create = ({ name, password, slot, key }) => {
        const result = new Package(this.length);

        result.append(this.number);
        result.writeUINT32(0xEDEDEDED);
        result.append(pad.right(name, 30));
        result.append(pad.right(password, 30));
        result.writeUINT32(slot);
        result.writeUINT32(key);

        return result
    };

}

export default _0x5D;
