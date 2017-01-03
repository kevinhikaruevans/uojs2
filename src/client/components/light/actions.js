import { createAction } from 'redux-actions-helpers'

export const overall = createAction('@@light/OVERALL', (overall) => ({
    overall
}));

export const personal = createAction('@@light/PERSONAL', ({ level, object }) => ({
    level,
    object
}));

export default {
    overall,
    personal
}
