import { actions as actionsServerList } from 'component/server-list'

// http://necrotoolz.sourceforge.net/kairpacketguide/packeta8.htm
export default class {

    meta = {
        number  : 0xA8,
        name    : 'Server List',
        length  : null,
        type    : 'server',
        alias   : []
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
        const list  = [];
        const step  = 40 + 6;
        const qty   = _package.getShort(4);

        for(let i = 0; qty > i; i++) {
            const offset= i * step;
            const id    = _package.getShort(offset);
            const name  = _package.getString(offset + 4, 32);
            const ip    = [39, 38, 37, 36].map(key => _package.getByte(offset + key));

            // @TODO: need Full & timezone

            list.push({
                id,
                name,
                ip : ip.join('.')
            })
        }

        dispatch(actionsServerList.list({
            list
        }));
    }

};
