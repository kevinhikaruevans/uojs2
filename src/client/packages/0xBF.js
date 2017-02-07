import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'
import { actions as map } from 'component/map'
import { actions as statusInfo } from 'component/status-info'

class _0xBF extends PackageBase {

    constructor() {
        super(0xBF);

        this.description = 'Generic Command';
    }

    create = (command, payload) => {
        let result = null;

        switch(command) {
            case 0x1A:
                result = new Package(7);
                result.append(this.number);
                result.appendShort(7);
                result.appendShort(command);
                result.append([
                    payload.stat,
                    payload.state
                ]);

                break;
        }

        return result
    };

    action = ({ dispatch }, _package) => {
        _package.begin();
        const command = _package.nextShort();

        switch(command) {
            // (SetMap) Subcommand 0x08: The index of the map the player is located within.
            case 0x08:
                const id = _package.nextByte();
                dispatch(map.updateMaster({ id }));
                break;
            // (MapDiff) Subcommand 0x18: The count of map diffs that were received.
            case 0x18:
                const count = _package.getInt();

                for(let i = 0; i < count; i++) {
                    console.log('MapDiff Static', _package.getInt());
                    console.log('MapDiff Map', _package.getInt());
                }
                console.log('MapDiff', count);
                break;
            case 0x19:
                const client = _package.nextByte();

                switch(client) {
                    case 0x2:
                        _package.nextInt(); // Serial (ID)
                        _package.nextByte(); // Always 0

                        const state = _package.nextByte();

                        if(state !== 0xFF) {
                            dispatch(statusInfo.updateState({
                                strength     : (state >> 4) & 0x03,
                                dexterity    : (state >> 2) & 0x03,
                                intelligence : (state) & 0x03
                            }))
                        }
                        break;
                    case 0x5:
                        console.warn('GeneralInfoPacket ExtendedStats 0x19. This is not a KR client.');
                        break;
                }
                break;
            default:
                console.warn('Subcommand not parse %s', (command).toString(16));
        }
    }

}

export default _0xBF;
