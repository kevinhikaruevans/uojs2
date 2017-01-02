import { createAction } from 'redux-actions-helpers'

export const update = createAction('@@season/UPDATE', ({ season, sound }) => ({
    season,
    sound
}));

export default {
    update
}
