import { createAction } from 'redux-actions-helpers'
import { Package } from 'component/helpers'

export const update = createAction('@@weather/UPDATE', ({ mode, effect, temperature }) => ({
    mode,
    effect,
    temperature
}));

export default {
    update
}
