import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

import { actions as version } from 'component/version'

class _0xBD extends PackageBase {

    constructor() {
        super(0xBD);

        this.description = 'Client Version';
    }

    create = version => {
        const length = 4 + version.length;
        const result = new Package(length);

        result.append(
            this.number,
            0x00,
            length,
            version,
            0
        );

        return result
    };

    action = ({ dispatch }, _package) => {
        dispatch(
            version.send()
        );
    }

}

export default _0xBD;
