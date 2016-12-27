import { handleActions } from 'redux-actions-helpers'

import { overall, personal } from './actions'

const initialState = {
    serial : null,
    playerName: null,
    health : {
        current : null,
        max : null
    },
    canChangeName : false,
    sex : null,
    strength : 0,
    dexterity: 0,
    intelligence : 0,
    stamina : {
        current : null,
        max     : null
    },
    mana : {
        current : null,
        max     : null
    },
    gold : 0,
    armorRating : null,
    weight : null,

};

export default handleActions({
    [overall] : (state, { overall }) => ({
        ...state,
        overall
    }),
    [personal] : (state, { level, object }) => ({
        ...state,
        personal : {
            level,
            object
        }
    })
}, {
    initialState
})
