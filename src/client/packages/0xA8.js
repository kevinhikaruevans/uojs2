import PackageBase from 'core/package-base'
import { actions as actionsServerList } from 'component/server-list'

// http://necrotoolz.sourceforge.net/kairpacketguide/packeta8.htm
class _0xA8 extends PackageBase {

    constructor() {
        super(0xA8);

        this.description = 'Server List';
    }

    action = ({ dispatch }, _package) => {
        const list  = [];
        const step  = 40 + 6;
        const qty   = _package.getShort(4);

        for(let i = 0; qty > i; i++) {
            const offset= i * step;
            const id    = _package.getShort(offset);
            const name  = _package.getString(offset + 4, 32);
            const ip    = [39, 38, 37, 36].map(key => _package.getByte(offset + key));

            // @TODO: need Full & timezone

            list.push({
                id,
                name,
                ip : ip.join('.')
            })
        }

        dispatch(actionsServerList.list({
            list
        }));
    }

}

export default _0xA8;
