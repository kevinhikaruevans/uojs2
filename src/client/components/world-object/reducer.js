import { handleActions } from 'redux-actions-helpers'
import { update, hash } from './actions'

const initialState = {};

export default handleActions({
    [hash] : (state, { serial, hash }) => {
        let result = { ...state };

        if(result[serial]) {
            result[serial] = {
                ...result[serial],
                hash
            }
        }

        return result;
    },
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
                equipment,
                hash : null
            }
        }

        return result;
    }
}, {
    initialState
})
