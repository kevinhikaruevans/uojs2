import { handleActions } from 'redux-actions-helpers'

import { update, updateState } from './actions'

const initialState = {
    serial          : null,
    playerName      : null,
    canChangeName   : false,
    sex             : null,
    flag            : null,
    strength        : 0,
    dexterity       : 0,
    intelligence    : 0,
    gold            : 0,
    armorRating     : null,

    state : {
        strength     : 0,
        dexterity    : 0,
        intelligence : 0
    },
    weight : {
        current : null,
        max     : null
    },
    stamina : {
        current : null,
        max     : null
    },
    health : {
        current : null,
        max     : null
    },
    mana : {
        current : null,
        max     : null
    }
};

export default handleActions({
    [update] : (state, payload) => {
        const params = {
            ...state,
            ...payload
        };
        delete params.type;

        return params
    },
    [updateState] : (state, { payload }) => ({
        ...state,
        state : payload
    })
}, {
    initialState
})
