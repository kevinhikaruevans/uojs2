import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

import { actions as combat } from 'component/combat'

class _0x72 extends PackageBase {

    constructor() {
        super(0x72, 0x0005);

        this.description = 'Combat';
    }

    create = (status) => {
        const result = new Package(length);

        result.append(
            this.number,
            status ? 0x01 : 0x00,
            0x00,
            0x32,
            0x00
        );

        return result
    };

    action = ({ dispatch }, _package) => {
        dispatch(
            combat.update(_package.getByte(1))
        );
    }

}

export default _0x72;
