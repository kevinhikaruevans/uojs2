

// http://necrotoolz.sourceforge.net/kairpacketguide/packet85.htm
export default class {

    meta = {
        number  : 0x85,
        name    : 'Delete Character Failed',
        length  : 0x0002,
        type    : 'server',
        alias   : []
    };

    // @TODO: i18n
    message = {
        0 : 'That character password is invalid.',
        1 : 'That character does not exist.',
        2 : 'That character is being played right now.',
        3 : 'That character is not old enough to delete.',
        4 : 'That character is currently queued for backup.',
        5 : 'Couldn\'t carry out your request.',
        99: 'Unknown delete character issue'
    };

    // Create base class
    get number() {
        return this.meta.number;
    }

    get name() {
        return this.meta.name;
    }

    get length() {
        return this.meta.length;
    }

    get alias() {
        return this.meta.alias;
    }

    get type() {
        return this.meta.type
    }
    // -------------

    action = ({ dispatch }, _package) => {
        let error = this.message[99];

        if(this.message[_package.getByte(1)]) {
            error = this.message[_package.getByte(1)];
        }

        console.log('HERETTD', error);
/*
        dispatch(
            actionsLogin.error({
                error
            })
        );
*/
    }

};
