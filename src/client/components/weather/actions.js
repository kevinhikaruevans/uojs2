import { createAction } from 'redux-actions-helpers'
import { Package } from 'component/helpers'

export const update = createAction('@@weather/UPDATE', ({ type, effect, temperature }) => ({
    type,
    effect,
    temperature
}));

export default {
    update
}
