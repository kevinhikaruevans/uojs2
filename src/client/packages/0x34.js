import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

// http://docs.polserver.com/packets/index.php?Packet=0x34
class _0x34 extends PackageBase {

    constructor() {
        super(0x34, 10);

        this.description = 'Get Player Status';
    }

    create = (type, serial) => {
        const result = new Package(this.length);

        result.append(
            this.number,
            0xED,
            0xED,
            0xED,
            0xED,
            type
        );
        result.writeUINT32(serial);

        return result
    };

}

export default _0x34;
