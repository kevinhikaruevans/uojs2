import PackageBase from 'core/package-base'

import { actions as worldObject } from 'component/world-object'

// http://docs.polserver.com/packets/index.php?Packet=0xDC
class _0xDC extends PackageBase {

    constructor() {
        super(0xDC, 9);

        this.description = 'SE Introduced Revision';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        dispatch(
            worldObject.hash({
                serial  : _package.nextInt(),
                hash    : _package.nextInt()
            })
        );
    }

}

export default _0xDC;
