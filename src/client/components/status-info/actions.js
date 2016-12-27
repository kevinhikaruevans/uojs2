import { createAction } from 'redux-actions-helpers'

export const update = createAction('@@status-info/UPDATE', overall => ({
    overall
}));

export default {
    update
}
