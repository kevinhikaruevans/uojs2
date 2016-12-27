import { createAction } from 'redux-actions-helpers'
import { Package } from 'component/helpers'

export const setInfo = createAction('@@player/SET_INFO', ({ serial, body, x, y, z, direction }) => ({
    serial,
    body,
    x,
    y,
    z,
    direction
}));

export const update = createAction('@@player/UPDATE', ({ serial, body, hue, status, x, y, z, direction }) => ({
    serial,
    body,
    hue,
    status,
    x,
    y,
    z,
    direction
}));

export default {
    setInfo,
    update
}
