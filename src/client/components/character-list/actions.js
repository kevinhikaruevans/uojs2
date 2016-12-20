import { createAction } from 'redux-actions-helpers';

export const characterList = createAction('@@character-list/SET', ({ list, cities }) => ({
    list,
    cities
}));

export default {
    characterList
}
