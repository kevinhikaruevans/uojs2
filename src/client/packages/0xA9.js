import PackageBase from 'core/package-base'
import { actions as character } from 'component/character'

// http://necrotoolz.sourceforge.net/kairpacketguide/packeta9.htm
class _0xA9 extends PackageBase {

    constructor() {
        super(0xA9);

        this.description = 'Character List';
    }

    action = ({ dispatch }, _package) => {
        const qty = _package.getByte(3);
        const list = [];
        const cities = [];

        if (qty < 5 || qty > 7) {
            throw 'character count in 0xA9 is not valid. it should be in (5, 6, 7)';
        }

        for(let i = 0; i < qty; i++) {
            list.push({
                name     : _package.getString(4 + i * 60, 30),
                password : _package.getString(34 + i * 60, 30)
            });
        }

        const qtyCities = _package.getByte(4 + (qty * 60));
        const offset = 4 + (qty * 60);

        for(let i = 0; i < qtyCities; i++) {
            cities.push({
                index   : _package.getByte(offset + (1 + i * 63)),
                name    : _package.getString(offset + (2 + i * 63), 30),
                tavern  : _package.getString(offset + (33 + i * 63), 30)
            })
        }

        dispatch(character.list({
            list,
            cities
        }));
    }

}

export default _0xA9;
