import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

import { actions as light } from 'component/light'

class _0x4E extends PackageBase {

    constructor() {
        super(0x4E, 0x0006);

        this.description = 'Personal Light Level';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        dispatch(
            light.personal({
                object  : _package.getInt(),
                level   : _package.nextByte()
            })
        )
    }

}

export default _0x4E;
