import { handleActions } from 'redux-actions-helpers'

import { update } from './actions'

const initialState = {
    season  : null,
    sound   : null
};

export default handleActions({
    [update] : (state, { season, sound }) => ({
        season,
        sound
    })
}, {
    initialState
})
