import PackageBase from 'core/package-base'

import { actions as login } from 'component/login'
import { actions as statusInfo } from 'component/status-info'
import { actions as skills } from 'component/skills'

class _0x55 extends PackageBase {

    constructor() {
        super(0x55, 0x0001);

        this.description = 'Login Complete';
    }

    action = ({ dispatch }) => {
        dispatch(
            login.complete()
        );
        dispatch(statusInfo.requestStateMaster())
        dispatch(skills.requestMaster())
    }

}

export default _0x55;
