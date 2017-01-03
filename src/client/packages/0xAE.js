import PackageBase from 'core/package-base'
import { pad } from 'component/helpers'

import { actions as message } from 'component/message'

// http://necrotoolz.sourceforge.net/kairpacketguide/packetae.htm
class _0xAE extends PackageBase {

    constructor() {
        super(0xAE);

        this.description = 'Text Unicode';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        const result = {
            serial  : _package.nextInt(),
            model   : _package.nextShort(),
            typeMsg : _package.nextByte(),
            hue     : _package.nextShort(),
            font    : _package.nextShort(),
            lang    : pad.trim(_package.nextUnicodeString(4)),
            speaker : _package.nextString(30).trim(),
            message : pad.trim(_package.nextUnicodeString(_package.variableSize - 48))
        };

        dispatch(
            message.add(result)
        );
    }

}

export default _0xAE
