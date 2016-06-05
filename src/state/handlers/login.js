export const register = (registry, state) => {
    registry.registerPacket(0xA8, (packet) => {
        const servers = new Array(packet.getShort(4)).fill({});
        const serverList = servers.map((o, index) => {
            // each entry is 40b at offset=6
            const offset = index * 40 + 6;
            const id = packet.getShort(offset);
            const name = packet.getString(offset + 2, 32);
            const address = [
                // it uses network endian, so the IP address is "reversed"
                packet.getByte(offset + 39),
                packet.getByte(offset + 38),
                packet.getByte(offset + 37),
                packet.getByte(offset + 36)
            ];
            return {
                id,
                name,
                address: address.join('.')
            };
        });
        state.update(
            {
                loggedIn: true,
                serverList
            },
            'serverlist'
        );
    });
    registry.registerPacket(0x82, (packet) => {
        console.log('login failure');
        // login failure
        const reason = {
            0: 'Incorrect name/password',
            1: 'Someone is already using this account',
            2: 'Your account is blocked',
            3: 'Your account credentials are invalid',
            4: 'Communication problem',
            5: 'IGR concurrency limit met',
            6: 'IGR time limit met',
            7: 'General IGR failure'
        }[packet.getByte(1)] || 'Unknown login issue';

        state.update({
            loggedIn: false,
            login: {
                failure: true,
                reason
            }
        }, 'login-failure');
    });
    registry.registerPacket(0x8C, (packet) => {
        // login success
        const address = [

        ];

        const port = packet.getShort();
        const key = packet.getInt();

        state.update({
            address, port, key
        }, 'login-success');
    });
};
