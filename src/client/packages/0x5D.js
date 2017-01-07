import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

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
        result.writeCHAR(name, 30);
        result.writeCHAR(password, 30); // @TODO: HERE not password http://docs.polserver.com/packets/index.php?Packet=0x5D
        result.writeUINT32(slot);
        result.writeUINT32(key);

        return result
    };

}

export default _0x5D;
