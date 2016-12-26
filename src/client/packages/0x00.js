import PackageBase from 'core/package-base'
import { Package, pad } from 'component/helpers'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet00.htm
class _0x00 extends PackageBase {

    constructor() {
        super(0x00, 0x0068);

        this.description = 'Character Creation';
    }

    create = (username, password, key) => {
        let result = new Package(this.length);

        result.append(this.number);
        result.writeUINT32(0xEDEDEDED);
        result.writeUINT32(0xffffffff);
        result.append(
            0x00,
            pad.right('testedS', 30),
            pad.right('password', 30),
        );
        /*result.append(
            0x00,
            pad.right('testedS', 30),
            pad.right('password', 30),
            0, // gender
            40,
            20,
            20,
            0,
            34,
            1,
            33,
            2,
            33
        );
        result.appendShort();
        result.appendShort(3000340);
        result.appendShort();
        result.appendShort(8256);
        result.appendShort();
        result.appendShort(9);
        result.appendShort(0x0000);
        result.appendShort(0);
        result.writeUINT32(key);
        result.appendShort();
        result.appendShort();*/

        return result;
    }

}

export default _0x00;
