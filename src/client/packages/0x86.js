import PackageBase from 'core/package-base'
import { actions as character } from 'component/character'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet86.htm
class _0x86 extends PackageBase {

    constructor() {
        super(0x86);

        this.description = 'All Characters';
    }

    action = ({ dispatch }, _package) => {
        const qty = _package.getByte(3);
        const list = [];

        for(let i = 0; i < qty; i++) {
            list.push({
                name     : _package.getString(4 + i * 60, 30),
                password : _package.getString(34 + i * 60, 30)
            });
        }

        dispatch(character.update({
            list
        }));
    }

}

export default _0x86;
