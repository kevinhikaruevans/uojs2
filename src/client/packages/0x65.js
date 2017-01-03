import PackageBase from 'core/package-base'

import { actions as weather } from 'component/weather'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet65.htm
class _0x65 extends PackageBase {

    constructor() {
        super(0x65, 0x0004);

        this.description = 'Weather Change';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        dispatch(
            weather.update({
                mode        : _package.nextByte(),
                effect      : _package.nextByte(),
                temperature : _package.nextByte()
            })
        );
    }

}

export default _0x65
