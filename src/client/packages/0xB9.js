import PackageBase from 'core/package-base'
import { actions } from 'component/features'

// http://necrotoolz.sourceforge.net/kairpacketguide/packetb9.htm
class _0xB9 extends PackageBase {

    constructor() {
        super(0xB9, 0x0003);

        this.description = 'Features';
    }

    action = ({ dispatch }, _package) => {
        dispatch(
            actions.features({
                flag : _package.getInt(1)
            })
        );
    }

}

export default _0xB9;
