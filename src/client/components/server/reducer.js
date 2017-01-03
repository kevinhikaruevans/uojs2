import { handleActions } from 'redux-actions-helpers'
import { list, setSelected } from './actions'

const initialState = {
    list        : [],
    selected    : 0,
    status      : false
};

export default handleActions({
    [list] : (state, { list }) => ({
        ...state,
        list,
        status : true
    }),
    [setSelected] : (state, { index }) => ({
        ...state,
        selected : index
    })
}, {
    initialState
})
