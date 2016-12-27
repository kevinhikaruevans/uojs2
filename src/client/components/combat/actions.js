import { createAction } from 'redux-actions-helpers'

export const update = createAction('@@combat/UPDATE', mode => ({
    status : mode
}));

export default {
    update
}
