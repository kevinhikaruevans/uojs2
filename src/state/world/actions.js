import { Packet } from '../../network/packet';
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
    const message = packet.nextString(packet.variableSize - 44).trim();
    const asciiMessage = {
        serial,
        model,
        type,
        color,
        font,
        name,
        message
    };

    console.error(asciiMessage);
    dispatch({
        type: types.WORLD_ADD_ASCII_MESSAGE,
        payload: asciiMessage
    });

    setTimeout(() => {
        // it's probably better to have a single timer, then add in each
        // callback + a delay or something, unless if that's already what the browser does...
        // will look into that
        dispatch({
            type: types.WORLD_REMOVE_ASCII_MESSAGE,
            payload: asciiMessage
        })
    }, 10000);
};

export const receiveWeather = (socket, packet) => (dispatch) => {
    packet.begin();
    const type = packet.nextByte();
    const particles = Math.max(Math.min(packet.nextByte(), 0), flags.WORLD_WEATHER_MAX_PARTICLES);
    const particlesPercentage = particles / WORLD_WEATHER_MAX_PARTICLES;
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
