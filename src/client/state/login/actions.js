import { Packet } from '../../network/packet';
import { StringUtils } from '../../utils';
import * as types from './actionTypes';
import { EmulationVersion } from '../../constants';

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

    socket.reconnect({
        key
    });
    dispatch({
        type: types.LOGIN_SERVER_RELAY,
        payload: key
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
