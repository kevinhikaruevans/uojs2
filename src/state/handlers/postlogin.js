export const register = (registry, state) => {
    registry.registerPacket(0xA9, (packet) => {
        const characterCount = packet.getByte(3);
        const characters = [];
        console.log(`there are ${characterCount} character slots to loop over`);

        for(let i = 0; i < characterCount; i++) {
            let position = 4;
            characters.push({
                name: packet.getString(position, 30)
            });

            position += 60;
        }

        console.log(characters);
    });
};
