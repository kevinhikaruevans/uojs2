import PackageBase from 'core/package-base'

// http://docs.polserver.com/packets/index.php?Packet=0x3A
class _0x3A extends PackageBase {

    constructor() {
        super(0x3A);

        this.description = 'Send Skills';
    }

    action = ({ dispatch }, _package) => {
        console.log(_package.size());
        _package.begin();

        const size = _package.nextShort();
        const type = _package.nextByte();

/*
        bool hasSkillCap = (PacketType == 0x02 || PacketType == 0xDF);
        int numSkills = (reader.Size - reader.Index - (PacketType == 0x00 ? 2 : 0)) / (hasSkillCap ? 9 : 7);
        Skills = new SendSkillsPacket_SkillEntry[numSkills];
  */
        console.log(_package.size())
        const count = ((_package.size() - 2) - (type === 0x00 ? 2 : 0)) / ((type === 0x02 || type === 0xDF) ? 9 : 7)
        console.warn(size, type, count)

        /*

        dispatch(
            season.update({
                season  : _package.nextByte(),
                sound   : _package.nextByte() === 1
            })
        );
*/
    }

}

export default _0x3A;
