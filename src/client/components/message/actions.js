import { createAction } from 'redux-actions-helpers'

export const add = createAction('@@message/ADD', ({ serial, model, typeMsg, hue, font, lang, speaker, message }) => ({
    serial,
    model,
    typeMsg,
    hue,
    font,
    lang,
    speaker,
    message
}));

export default {
    add
}
