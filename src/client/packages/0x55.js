import PackageBase from 'core/package-base'

import { actions as login } from 'component/login'

class _0x55 extends PackageBase {

    constructor() {
        super(0x55, 0x0001);

        this.description = 'Login Complete';
    }

    action = ({ dispatch }) => {
        dispatch(
            login.complete()
        );
    }

}

export default _0x55;
