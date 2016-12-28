import PackageBase from 'core/package-base'

import { actions as worldObject } from 'component/world-object'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet78.htm
class _0x78 extends PackageBase {

    constructor() {
        super(0x78);

        this.description = 'Equipped MOB';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        const result = {
            serial      : _package.nextInt(),
            model       : _package.nextShort(),
            x           : _package.nextShort(),
            y           : _package.nextShort(),
            z           : _package.nextByte(),
            direction   : _package.nextByte(),
            hue         : _package.nextShort(),
            flag        : _package.nextByte(),
            notoriety   : _package.nextByte(),
            equipment   : []
        };

        let serial = _package.nextInt();

        if(serial) {
            while(serial) {
                const item = {
                    serial,
                    model   : _package.nextShort(),
                    layer   : _package.nextByte(),
                    hue     : null
                };

                if(item.model & 0x8000) {
                    item.hue = _package.nextShort();
                }
                result.equipment.push(item);
                serial = _package.nextInt();
            }
        }

        dispatch(worldObject.update(result));
    }

}

export default _0x78
