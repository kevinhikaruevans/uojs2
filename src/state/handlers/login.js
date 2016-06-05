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
};
