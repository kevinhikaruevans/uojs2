import { handleActions } from 'redux-actions-helpers'

import { update } from './actions'

const initialState = {};

export default handleActions({
    [update] : (state, { serial, model, x, y, z, direction, hue, flag, notoriety, equipment }) => {
        let result = {
            ...state
        };

        if(result[serial]) {
            result[serial] = {
                ...result[serial],
                serial,
                model,
                x,
                y,
                z,
                direction,
                hue,
                flag,
                notoriety,
                equipment
            }
        } else {
            result[serial] = {
                serial,
                model,
                x,
                y,
                z,
                direction,
                hue,
                flag,
                notoriety,
                equipment
            }
        }

        return result;
    }
}, {
    initialState
})
