import PackageBase from 'core/package-base'

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
        let error = this.message[100];

        if(this.message[_package.getByte(1)]) {
            error = this.message[_package.getByte(1)];
        }

        console.log(error);
        // @TODO: DISPATCH
    }

}

export default _0x85;
