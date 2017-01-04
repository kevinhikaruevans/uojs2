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
        payload.flag = _package.nextByte();

        if(payload.flag > 0) {
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
            payload.weight = {
                current : _package.nextShort()
            };

            if (payload.flag >= 0x05) {
                payload.weight.max = _package.nextShort();
                payload.race = _package.nextByte();
            }

            if (payload.flag >= 0x03) {
                payload.statCap = _package.nextShort();
                payload.followers = {
                    current : _package.nextByte(),
                    max     : _package.nextByte()
                };
            }

            if (payload.flag >= 0x04) {
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
                payload.tithingPoints = _package.nextInt()
            }

            if (payload.flag >= 0x06) {
                //TODO http://docs.polserver.com/packets/index.php?Packet=0x11
                payload.hitChanceIncrease = _package.nextShort();
                payload.swingSpeedIncrease = _package.nextShort();
                payload.damageChanceIncrease = _package.nextShort();
                payload.lowerReagentCost = _package.nextShort();
                payload.hitPointsRegeneration = _package.nextShort();
                payload.staminaRegeneration = _package.nextShort();
                payload.manaRegeneration = _package.nextShort();
                payload.reflectPhysicalDamage = _package.nextShort();
                payload.enhancePotions = _package.nextShort();
                payload.defenseChanceIncrease = _package.nextShort();
                payload.spellDamageIncrease = _package.nextShort();
                payload.fasterCastRecovery = _package.nextShort();
                payload.fasterCasting = _package.nextShort();
                payload.lowerManaCost = _package.nextShort();
                payload.strengthIncrease = _package.nextShort();
                payload.dexterityIncrease = _package.nextShort();
                payload.intelligenceIncrease = _package.nextShort();
                payload.hitPointsIncrease = _package.nextShort();
                payload.staminaIncrease = _package.nextShort();
                payload.manaIncrease = _package.nextShort();
                payload.maximumHitPointsIncrease = _package.nextShort();
                payload.maximumStaminaIncrease = _package.nextShort();
                payload.maximumManaIncrease = _package.nextShort();
            }
        }

        dispatch(
            statusInfo.update(payload)
        );
    }

}

export default _0x11;
