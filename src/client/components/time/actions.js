import { createAction } from 'redux-actions-helpers'

export const update = createAction('@@time/UPDATE', ({ hour, minute, second }) => ({
    hour,
    minute,
    second
}));

export default {
    update
}
