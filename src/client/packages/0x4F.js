import PackageBase from 'core/package-base'

import { actions as light } from 'component/light'

class _0x4F extends PackageBase {

    constructor() {
        super(0x4F, 0x0002);

        this.description = 'Sunlight';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        dispatch(
            light.overall(_package.nextByte())
        )
    }

}

export default _0x4F;
