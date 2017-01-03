import PackageBase from 'core/package-base'

import { actions as character } from 'component/character'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet85.htm
class _0x85 extends PackageBase {

    // @TODO: i18n
    message = {
        0   : 'That character password is invalid.',
        1   : 'That character does not exist.',
        2   : 'That character is being played right now.',
        3   : 'That character is not old enough to delete.',
        4   : 'That character is currently queued for backup.',
        5   : 'Couldn\'t carry out your request.',
        100 : 'Unknown delete character issue'
    };

    constructor() {
        super(0x85, 0x0002);

        this.description = 'Delete Character Failed';
    }

    action = ({ dispatch }, _package) => {
        const code = _package.getByte(1);

        dispatch(
            character.removeError({
                code,
                message : this.message[code] || this.message[100]
            })
        );
    }

}

export default _0x85;
