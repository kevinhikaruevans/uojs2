import PackageBase from 'core/package-base'
import { actions as player } from 'component/player'
import { actions as map } from 'component/map'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet20.htm
class _0x20 extends PackageBase {

    constructor() {
        super(0x20, 0x0013);

        this.description = 'Teleport';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();

        const serial = _package.nextInt();
        const body = _package.nextShort();
        _package.nextByte();
        const hue = _package.nextShort();
        const status = _package.nextByte();
        const x = _package.nextShort();
        const y = _package.nextShort();
        _package.nextShort();
        const direction = _package.nextByte();
        const z = _package.nextByte();

        dispatch(
            player.update({
                serial,
                body,
                hue,
                status,
                x,
                y,
                z,
                direction
            })
        );
        dispatch(
            map.updateMaster({
                x,
                y
            })
        )

    }

}

export default _0x20;
