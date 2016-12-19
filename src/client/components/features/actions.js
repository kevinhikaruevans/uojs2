import { createAction } from 'redux-actions-helpers';

export const features = createAction('@@features/SET', ({ flag }) => ({
    flag
}));

export default {
    features
}
