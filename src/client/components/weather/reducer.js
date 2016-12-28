import { handleActions } from 'redux-actions-helpers'

import { update } from './actions'

const initialState = {
    mode        : null,
    effect      : null,
    temperature : null
};

export default handleActions({
    [update] : (state, { mode, effect, temperature }) => ({
        mode,
        effect,
        temperature
    })
}, {
    initialState
})
