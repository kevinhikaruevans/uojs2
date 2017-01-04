import { handleActions } from 'redux-actions-helpers'

import config from 'config'
import { send, receive, changeInterval } from './actions'

const initialState = {
    iteration        : 0,
    timeSend         : null,
    timeReceive      : null,
    timeDiff         : null,
    intervalList     : config['component.ping.interval-list'] || [30000],
    intervalSelected : config['component.ping.interval-default'] || 0
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
            timeDiff : timeReceive - state.timeSend
        }
    },
    [changeInterval] : (state, { index }) => ({
        ...state,
        intervalSelected : index
    })
}, {
    initialState
})
