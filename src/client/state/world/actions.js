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

export const receiveGeneralInformation = (socket, packet) => (dispatch) => {
    packet.begin();
    const subcommand = packet.nextShort();

    console.info('general info packet, subcommand: ', subcommand);

    switch(subcommand) {
        default:
            {
                console.warn('unknown subcommand', subcommand);
            }
            break;
        case 0x01:
            {
                console.info('initialize fast walk... no idea how this works really');
            }
            break;

        case 0x04:
            {
                console.log('force close gump');
            }
            break;

        case 0x05:
            {
                packet.nextShort();
                const width = packet.nextShort();
                const height = packet.nextShort();
                console.log('screen size: ', width, height);
            }
            break;

        case 0x08:
            {
                const mapType = packet.nextByte();
                dispatch({
                    type: types.WORLD_UPDATE_MAP,
                    payload: {
                        id: mapType
                    }
                })
            }
    }
};

// 0x78 "draw object"
export const receiveNewObject = (socket, packet) => (dispatch) => {
    packet.begin();

    const newObject = {};
    newObject.serial = packet.nextInt();
    newObject.model = packet.nextShort();
    newObject.x = packet.nextShort();
    newObject.y = packet.nextShort();
    newObject.z = packet.nextByte();
    newObject.direction = packet.nextByte();
    newObject.hue = packet.nextShort();
    newObject.flag = packet.nextByte();
    newObject.notoriety = packet.nextByte();

    let wearableSerial = packet.nextInt();
    console.log('wearable serial', wearableSerial);
    if (wearableSerial) {
        newObject.layers = [];
        while (wearableSerial) {
            const layer = { serial: wearableSerial };
            layer.model = packet.nextShort();
            layer.layer = packet.nextByte();
            if (layer.model & 0x8000) {
                layer.hue = packet.nextShort();
            }
            newObject.layers.push(layer);
            wearableSerial = packet.nextInt();
        }
    }

    dispatch({
        type: types.WORLD_ADD_OBJECT,
        payload: newObject
    });
};

export const receiveDeleteObject = (socket, packet) => (dispatch) => {
    packet.begin();
    const serial = packet.nextInt();
    dispatch({
        type: types.WORLD_DELETE_OBJECT,
        payload: serial
    });
};
