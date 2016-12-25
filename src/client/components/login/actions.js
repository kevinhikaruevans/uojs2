import { createAction } from 'redux-actions-helpers'
import { Package, pad } from 'component/helpers'
import manager from 'package/manager'

export const auth = createAction('@@login/AUTH', ({ username, password }) => ({
    username,
    password
}));

export const error = createAction('@@login/ERROR', ({ error }) => ({
    error
}));

export const authMaster = payout => (dispatch, getState, transport) => {
    dispatch(auth(payout));

    const packageSeed = manager.getPackage('seed');
    console.log(packageSeed);
    transport.sendPacket(packageSeed.create(getState().connect.ip));

    const packageLoginRequest = manager.getPackage(0x80);
    console.log('123', packageLoginRequest)
    transport.sendPacket(packageLoginRequest.create(payout.username, payout.password));
};

export default {
    authMaster,
    error
}


/*
import { Packet } from '../../network/packet';
import { StringUtils } from '../../utils';
import * as types from './actionTypes';
import { EmulationVersion } from '../../constants';

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
        type: types.LOGIN_UPDATE_SERVERLIST,
        payload: serverList
    });
};

export const receiveServerRelay /!* aka login success!*!/ = (socket, packet) => (dispatch) => {
    /!*
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
     *!/
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

    socket.reconnect({
        key
    });
    dispatch({
        type: types.LOGIN_SERVER_RELAY,
        payload: key
    });
};

export const receiveLoginFailure = (socket, packet) => (dispatch) => {
    /!*
        depending on the server used (particularly runuo/servuo), this packet
        might not even exist. there is a bug in these servers that causes the packet
        to not get written to the stream. the socket closes (on their end) before
        its flushed.
     *!/
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
    const characterCount = packet.getByte(3);
    const characters = [];

    if (characterCount < 5 || characterCount > 7) {
        throw 'character count in 0xA9 is not valid. it should be in (5, 6, 7)';
    }

    for(let i = 0; i < characterCount; i++) {
        characters.push({
            name: packet.getString(4 + i * 60, 30),
            password: packet.getString(34 + i * 60, 30)
        });
    }

    dispatch({
        type: types.LOGIN_UPDATE_CHAR_LIST,
        payload: characters
    });
};

export const receiveFeatures = (socket, packet) => (dispatch) => {
    const flags = packet.getInt(1);

    dispatch({
        type: types.LOGIN_UPDATE_SERVER_FEATURES,
        payload: flags
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

export const chooseCharacter = (socket, characterIndex = 0) => (dispatch, getState) => {
    const state = getState();
    const characters = state.login.user.characters;
    const chosenCharacter = characters[characterIndex];
    const packet = new Packet(73);
    console.info('choosing character', chosenCharacter);
    packet.append(0x5D, 0xED, 0xED, 0xED, 0xED);
    packet.append(StringUtils.padRight(chosenCharacter.name, 30));
    // I have _NO_ idea what his segment is for:
    packet.append(Array(5), 0x3F, Array(7), 0x02, Array(19));
    packet.append(characterIndex);
    // 127.0.0.1 :)
    packet.append(0x7F, 0x00, 0x00, 0x01);
    socket.send(packet);

    dispatch({
        type: types.LOGIN_CHOOSE_CHAR,
        payload: characterIndex
    });
};

export const sendVersionString = (socket) => (dispatch) => {
    const length = 4 + EmulationVersion.length;
    const versionPacket = new Packet(length);
    versionPacket.append(0xBD, 0x00, length, EmulationVersion, 0);
    socket.send(versionPacket);

    dispatch({
        type: types.LOGIN_SENT_VERSION,
        payload: EmulationVersion
    });
};

export const receiveLoginCompleted = () => (dispatch) => {
    dispatch({
        type: types.LOGIN_COMPLETED
    });
};

export const receiveTime = (socket, packet) => (dispatch) => {
    packet.begin();

    const h = StringUtils.padLeft(`${packet.nextByte()}`, 2, '0');
    const m = StringUtils.padLeft(`${packet.nextByte()}`, 2, '0');
    const s = StringUtils.padLeft(`${packet.nextByte()}`, 2, '0');

    const time = {
        offset: 0, //TODO: calculate the diff between the client & server timezone
        loginTime: `${h}:${m}:${s}`
    };

    dispatch({
        type: types.LOGIN_UPDATE_TIME,
        payload: time
    });
};
*/
