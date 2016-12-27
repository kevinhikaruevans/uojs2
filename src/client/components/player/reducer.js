import { handleActions } from 'redux-actions-helpers'

import { setInfo, update } from './actions'

const initialState = {
    serial      : null,
    body        : null,
    hue         : null,
    status      : null,
    x           : null,
    y           : null,
    z           : null,
    direction   : null,
};
export default handleActions({
    [setInfo] : (state, { serial, body, x, y, z, direction }) => ({
        ...state,
        serial,
        body,
        x,
        y,
        z,
        direction
    }),
    [update] : (state, { serial, body, hue, status, x, y, z, direction }) => ({
        serial,
        body,
        hue,
        status,
        x,
        y,
        z,
        direction
    })
}, {
    initialState
})
