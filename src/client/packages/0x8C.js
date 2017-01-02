import PackageBase from 'core/package-base'

import { actions as connect } from 'component/connect'
import { actions as login } from 'component/login'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet8c.htm
class _0x8C extends PackageBase {

    constructor() {
        super(0x8C, 0x000B);

        this.description = 'Server Redirect';
    }

    action = ({ dispatch }, _package) => {
        const address   = [1, 2, 3, 4].map(offset => _package.getByte(offset));
        const port      = _package.getShort(5);
        const key       = [7, 8, 9, 10].map(offset => _package.getByte(offset));

        // @TODO: interation 2
        dispatch(connect.disconnectMaster()).then(
            zaeb => {
                const result = dispatch(
                    connect.connectMaster({
                        host : address.join('.'),
                        port
                    })
                );

                result
                    .then(
                        result => {
                            dispatch(
                                connect.compressionEnable()
                            );
                            dispatch(
                                    login.reloginMaster({
                                    key
                                })
                            );
                        },
                        error => {
                            console.log(22222)
                        }
                    );
            }
        )

    }

}

export default _0x8C;
