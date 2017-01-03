import PackageBase from 'core/package-base'
import { actions as statusInfo } from 'component/status-info'

// http://necrotoolz.sourceforge.net/kairpacketguide/packet11.htm
class _0x11 extends PackageBase {

    constructor() {
        super(0x11);

        this.description = 'Mobile Stats';
    }

    action = ({ dispatch }, _package) => {
        const payload = {};

        _package.begin();
        payload.serial = _package.nextInt();
        payload.playerName = _package.nextString(30);
        payload.health = {
            current : _package.nextShort(),
            max     : _package.nextShort()
        };
        payload.canChangeName = !_package.nextByte();

        const typeFlag = _package.nextByte();

        if(typeFlag > 0) {
            payload.sex = _package.nextByte();
            payload.strength = _package.nextShort();
            payload.dexterity = _package.nextShort();
            payload.intelligence = _package.nextShort();
            payload.stamina = {
                current : _package.nextShort(),
                max     : _package.nextShort()
            };
            payload.mana = {
                current : _package.nextShort(),
                max     : _package.nextShort()
            };
            payload.gold = _package.nextInt();
            payload.armorRating = _package.nextShort();
            payload.weight = _package.nextShort();

            if (typeFlag >= 0x05) {
                payload.maxWeight = _package.nextShort();
                payload.race = _package.nextByte();
            }

            if (typeFlag >= 0x03) {
                payload.statCap = _package.nextShort();
                payload.followers = {
                    current : _package.nextByte(),
                    max     : _package.nextByte()
                };
            }

            if (typeFlag >= 0x04) {
                payload.resist = {
                    fire    : _package.nextShort(),
                    cold    : _package.nextShort(),
                    poison  : _package.nextShort(),
                    energy  : _package.nextShort()
                };
                payload.luck = _package.nextShort();
                payload.damage = {
                    min : _package.nextShort(),
                    max : _package.nextShort()
                };
            }

            if (typeFlag >= 0x06) {
                //TODO http://docs.polserver.com/packets/index.php?Packet=0x11
            }
        }

        dispatch(
            statusInfo.update(payload)
        );
    }

}

export default _0x11;
