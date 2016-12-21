import PackageBase from 'core/package-base'
import { actions as actionsLogin } from 'component/login'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet82.htm
class _0x82 extends PackageBase {

    // @TODO: i18n
    message = {
        0   : 'Incorrect name/password',
        1   : 'Someone is already using this account',
        2   : 'Your account is blocked',
        3   : 'Your account credentials are invalid',
        4   : 'Communication problem',
        5   : 'IGR concurrency limit met',
        6   : 'IGR time limit met',
        7   : 'General IGR failure',
        100 : 'Unknown login issue'
    };

    constructor() {
        super(0x82, 0x0002);

        this.description = 'Account Login Failed';
    }

    /*
     depending on the server used (particularly runuo/servuo), this packet
     might not even exist. there is a bug in these servers that causes the packet
     to not get written to the stream. the socket closes (on their end) before
     its flushed.
     */
    action = ({ dispatch }, _package) => {
        let error = this.message[100];

        if(this.message[_package.getByte(1)]) {
            error = this.message[_package.getByte(1)];
        }

        dispatch(
            actionsLogin.error({
                error
            })
        );
    }

}

export default _0x82
