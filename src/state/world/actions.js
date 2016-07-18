import { Packet } from '../../network/packet';
import { StringUtils } from '../../utils';
import * as types from './actionTypes';
import * as flags from './flags';

export const receiveObjectInfo = (socket, packet) => (dispatch) => {
    const id = packet.getInt(3);
    const g = packet.getShort(7);
    const serial = id ^ 0x80000000;
};

export const receiveAsciiMessage = (socket, packet) => (dispatch) => {
    packet.begin();
    const serial = packet.nextInt();
    const model = packet.nextShort();
    const type = packet.nextByte();
    const color = packet.nextShort();
    const font = packet.nextShort();
    const name = packet.nextString(30).trim();
    const message = StringUtils.trim(packet.nextString(packet.variableSize - 44));
    const asciiMessage = {
        unicode: false,
        serial,
        model,
        type,
        color,
        font,
        name,
        message
    };

    dispatch({
        type: types.WORLD_ADD_MESSAGE,
        payload: asciiMessage
    });

    setTimeout(() => {
        // it's probably better to have a single timer, then add in each
        // callback + a delay or something, unless if that's already what the browser does...
        // will look into that
        dispatch({
            type: types.WORLD_REMOVE_MESSAGE,
            payload: asciiMessage
        })
    }, 10000);
};

export const receiveUnicodeMessage = (socket, packet) => (dispatch) => {
    packet.begin();
    const serial = packet.nextInt();
    const model = packet.nextShort();
    const type = packet.nextByte();
    const color = packet.nextShort();
    const font = packet.nextShort();
    const language = packet.nextInt();
    const name = packet.nextString(30);
    const message = StringUtils.trim(packet.nextUnicodeString(packet.variableSize - 48));

    const unicodeMessage = {
        unicode: true,
        serial,
        model,
        type,
        color,
        font,
        name,
        language,
        message
    };

    dispatch({
        type: types.WORLD_ADD_MESSAGE,
        payload: unicodeMessage
    });

    setTimeout(() => {
        dispatch({
            type: types.WORLD_REMOVE_MESSAGE,
            payload: unicodeMessage
        })
    }, 10000);
};

export const receiveSeason = (socket, packet) => (dispatch) => {
    packet.begin();

    const season = packet.nextByte();
    const playSound = packet.nextByte() === 1;


    dispatch({
        type: types.WORLD_UPDATE_SEASON,
        payload: {
            flag: season,
            playSound
        }
    });
};

export const receiveWeather = (socket, packet) => (dispatch) => {
    packet.begin();
    const type = packet.nextByte();
    const particles = Math.max(Math.min(packet.nextByte(), 0), flags.WORLD_WEATHER_MAX_PARTICLES);
    const particlesPercentage = particles / flags.WORLD_WEATHER_MAX_PARTICLES;
    const temperature = packet.nextByte();

    dispatch({
        type: types.WORLD_UPDATE_WEATHER,
        payload: {
            isSnowing: type === flags.WorldWeatherSnow,
            isRaining: type === flags.WorldWeatherRain,
            particles: particlesPercentage,
            temperature
        }
    });
};

export const receiveWorldLightLevel = (socket, packet) => (dispatch) => {
    packet.begin();
    const lightLevel = packet.nextByte();

    dispatch({
        type: types.WORLD_UPDATE_LIGHT,
        payload: lightLevel
    });
};
