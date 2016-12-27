import PackageBase from 'core/package-base'
import { actions as season } from 'component/season'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet1b.htm
class _0xBC extends PackageBase {

    constructor() {
        super(0xBC, 0x0003);

        this.description = 'Game Season';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        dispatch(
            season.update({
                season  : _package.nextByte(),
                sound   : _package.nextByte() === 1
            })
        );
    }

}

export default _0xBC;
