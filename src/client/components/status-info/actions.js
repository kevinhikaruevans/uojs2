import { createAction } from 'redux-actions-helpers'

export const update = createAction('@@status-info/UPDATE', (payload) => ({
    ...payload
}));

export default {
    update
}
