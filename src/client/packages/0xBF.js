import PackageBase from 'core/package-base'
import { Package } from 'component/helpers'

class _0xBF extends PackageBase {

    constructor() {
        super(0xBF);

        this.description = 'Generic Command';
    }

    create = (command, payload) => {
        let result = new Package(5);

        switch(command) {
            case 0x1A:
                result.append(this.number);
                result.appendShort(command);
                result.append([
                    payload.stat,
                    payload.state
                ]);

                break;
        }

        console.log(result, command);
        return result
    };

    action = ({ dispatch }, _package) => {
        _package.begin();
        const command = _package.nextShort();

        console.log('HERE', command);
        switch(command) {
            // (SetMap) Subcommand 0x08: The index of the map the player is located within.
            case 0x08:
                console.log('SetMap', _package.nextByte());
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
                console.log('HERE');
                break;
            default:
                console.warn('Subcommand not parse %s', (command).toString(16));
        }
    }

}

export default _0xBF;
