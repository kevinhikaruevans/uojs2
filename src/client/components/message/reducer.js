import { handleActions } from 'redux-actions-helpers'

import { add } from './actions'

const initialState = {
    normal      : [],
    broadcast   : [],
    emote       : [],
    system      : [],
    message     : [],
    whisper     : [],
    yell        : [],
    last        : []
};

export default handleActions({
    [add] : (state, { serial, model, typeMsg, hue, font, lang, speaker, message }) => {
        const data = {
            serial,
            model,
            hue,
            font,
            lang,
            speaker,
            message
        };
        const last = [
            data,
            ...state.last.slice(0, 4)
        ];
        const result = {
            ...state,
            last
        };

        // @TODO: plss stop monkey code :)
        switch(typeMsg) {
            case 0x00:
                result.normal = [
                    data,
                    ...state.normal.slice(0, 4)
                ];
                break;
            case 0x01:
                result.broadcast = [
                    data,
                    ...state.broadcast.slice(0, 4)
                ];
                break;
            case 0x02:
                result.emote = [
                    data,
                    ...state.emote.slice(0, 4)
                ];
                break;
            case 0x06:
                result.system = [
                    data,
                    ...state.system.slice(0, 4)
                ];
                break;
            case 0x07:
                result.message = [
                    data,
                    ...state.message.slice(0, 4)
                ];
                break;
            case 0x08:
                result.whisper = [
                    data,
                    ...state.whisper.slice(0, 4)
                ];
                break;
            case 0x09:
                result.yell = [
                    data,
                    ...state.yell.slice(0, 4)
                ];
                break;
        }

        return result
    }
}, {
    initialState
})
