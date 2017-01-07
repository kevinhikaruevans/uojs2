import PackageBase from 'core/package-base'
import { actions as player } from 'component/player'
import { actions as login } from 'component/login'
import { actions as map } from 'component/map'
import { actions as skills } from 'component/skills'
import { actions as statusInfo } from 'component/status-info'
import { actions as version } from 'component/version'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet1b.htm
class _0x1B extends PackageBase {

    constructor() {
        super(0x1B, 0x0025);

        this.description = 'Login Confirm';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();
        const serial = _package.nextInt();
        _package.nextInt();
        const body = _package.nextShort();
        const x = _package.nextShort();
        const y = _package.nextShort();
        const z = _package.nextShort();
        const direction = _package.nextByte();

        _package.nextByte();
        _package.nextInt();

/*
        const serverBoundX = _package.nextShort();
        const serverBoundY = _package.nextShort();
        const serverBoundWidth = _package.nextShort();
        const serverBoundHeight = _package.nextShort();
*/

        dispatch(login.confirm());
        dispatch(skills.requestMaster());
        dispatch(version.send());
        // @TODO: &
        dispatch(statusInfo.typeMaster());
        dispatch(
            player.setInfo({
                serial,
                body,
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

export default _0x1B;
