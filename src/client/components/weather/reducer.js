import { handleActions } from 'redux-actions-helpers'

import { update } from './actions'

const initialState = {
    type        : null,
    effect      : null,
    temperature : null
};

export default handleActions({
    [update] : (state, { type, effect, temperature }) => ({
        type,
        effect,
        temperature
    })
}, {
    initialState
})
