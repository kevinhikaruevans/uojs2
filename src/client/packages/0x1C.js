import PackageBase from 'core/package-base'
import { pad } from 'component/helpers'

import { actions as message } from 'component/message'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet1c.htm
class _0x1C extends PackageBase {

    constructor() {
        super(0x1C);

        this.description = 'Text';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        const result = {
            serial  : _package.nextInt(),
            model   : _package.nextShort(),
            typeMsg : _package.nextByte(),
            hue     : _package.nextShort(),
            font    : _package.nextShort(),
            lang    : null,
            speaker : _package.nextString(30).trim(),
            message : pad.trim(_package.nextString(_package.variableSize - 44))
        };

        dispatch(
            message.add(result)
        );
    }

}

export default _0x1C
