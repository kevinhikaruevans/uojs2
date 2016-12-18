import { createAction } from 'redux-actions-helpers';

export const list = createAction('@@server-list/LIST', ({ list }) => ({
    list
}));

export default {
    list
}
