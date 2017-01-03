import { handleActions } from 'redux-actions-helpers'

import { send, receive } from './actions'

const initialState = {
    iteration   : 0,
    timeSend    : null,
    timeReceive : null,
    timeDiff    : null,
    // @TODO: param go config
    interval    : 30000
};

export default handleActions({
    [send] : (state) => ({
        ...state,
        iteration   : state.iteration + 1,
        timeSend    : Date.now()
    }),
    [receive] : (state) => {
        const timeReceive = Date.now();

        return {
            ...state,
            timeReceive,
            timeDiff    : timeReceive - state.timeSend
        }
    }
}, {
    initialState
})
