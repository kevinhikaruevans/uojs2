import PackageBase from 'core/package-base'

class _0xBF extends PackageBase {

    constructor() {
        super(0xBF);

        this.description = 'Generic Command';
    }

    action = ({ dispatch }, _package) => {
        _package.begin();
        const command = _package.nextShort();

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
            default:
                console.warn('Subcommand not parse %s', (command).toString(16));
        }
    }

}

export default _0xBF;
