import PackageBase from 'core/package-base'
import { actions as time } from 'component/time'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet5b.htm
class _0x5B extends PackageBase {

    constructor() {
        super(0x5B, 0x0004);

        this.description = 'Game Time';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        dispatch(time.update({
            hour    : _package.nextByte(),
            minute  : _package.nextByte(),
            second  : _package.nextByte()
        }));
    }

}

export default _0x5B;
