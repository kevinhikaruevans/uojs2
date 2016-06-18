import { Packet } from '../../network/packet';
import * as types from './actionTypes';

export const receiveServerlist = (socket, packet) => (dispatch) => {
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

    dispatch({
        type: types.LOGIN_SERVERLIST,
        payload: serverList
    });
};

export const receiveServerRelay /* aka login success!*/ = (socket, packet) => (dispatch) => {
    /*
        this packet sends the client the [new] address to (re)connect to.
        generally, it's the same address of the login server, but in a couple
        of cases, they can be different.

        HOWEVER! currently, since we're using websockify, we can only reconnect
        onto the same server at this time. I think there's a way to setup tokens
        through websockify to change this, but I haven't had the time to look
        into that...

        so instead of connecting to the given server, we're gonna reconnect
        to the same server :/

        also, weirdly enough, this does NOT use big endian for the address.
     */
    const address = [
        packet.getByte(1),
        packet.getByte(2),
        packet.getByte(3),
        packet.getByte(4)
    ].join('.');

    const port = packet.getShort(5);
    const key = [
        packet.getByte(7),
        packet.getByte(8),
        packet.getByte(9),
        packet.getByte(10)
    ];

    console.warn(`received a server relay, but I can't connect to ${address}:${port} because I'm not able to yet...`);
    console.warn(`we'll just connect to the same address/port again`);

    dispatch({
        type: types.LOGIN_SERVER_RELAY,
        payload: key
    });
};

export const receiveLoginFailure = (socket, packet) => (dispatch) => {
    /*
        depending on the server used (particularly runuo/servuo), this packet
        might not even exist. there is a bug in these servers that causes the packet
        to not get written to the stream. the socket closes (on their end) before
        its flushed.
     */
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

    dispatch({
        type: types.LOGIN_FAILURE,
        payload: reason
    });
};

export const receiveCharacterList = (socket, packet) => (dispatch) => {
    console.log('character list');

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
    dispatch({
        type: types.LOGIN_RECV_CHAR_LIST,
        payloiad: characters
    });
};

export const chooseShard = (socket, shardId = 0) => (dispatch) => {
    const packet = new Packet(3);
    // shard.id is technically a short, but I'm saying it's a byte
    // and padding the first with a zero.
    packet.append(0xA0, 0, shardId);
    socket.send(packet);

    dispatch({
        type: types.LOGIN_SELECT_SHARD,
        payload: shardId
    });
};
