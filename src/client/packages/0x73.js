import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

import { actions as ping } from 'component/ping';

class _0x73 extends PackageBase {

    constructor() {
        super(0x73, 0x0002);

        this.description = 'Ping / Pong';
    }

    // @TODO: Cached function
    create = () => {
        const result = new Package(this.length);

        result.append(this.number, 0x00);

        return result
    };

    action = ({ dispatch, getState }, _package) => {
        dispatch(ping.receive());

        setTimeout(() => dispatch(ping.sendMaster()), getState().ping.interval || 30000);
    }

}

export default _0x73;
