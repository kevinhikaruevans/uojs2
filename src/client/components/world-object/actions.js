import { createAction } from 'redux-actions-helpers'

export const update = createAction('@@world-object/UPDATE', ({ serial, model, x, y, z, direction, hue, flag, notoriety, equipment }) => ({
    serial,
    model,
    x,
    y,
    z,
    direction,
    hue,
    flag,
    notoriety,
    equipment
}));

export default {
    update
}
