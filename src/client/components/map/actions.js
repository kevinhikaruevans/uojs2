import { createAction } from 'redux-actions-helpers'
import { Package } from 'component/helpers'

export const update = createAction('@@map/UPDATE', ({ x, y, tiles }) => ({
    x,
    y,
    tiles
}));

export const updateMaster = ({ x, y }) => (dispatch, getState, transport) => {
    x = Math.round(x / 8);
    y = Math.round(y / 8);

    console.info(x, y)
    const fetch = window.fetch(`http://107.161.24.129:2590/map?y=${y}&x=${x}`);

    fetch
        .then(
            result => result.json(),
            error => console.error(error)
        )
        .then(
            tiles => {
                dispatch(update({
                    x,
                    y,
                    tiles
                }))
            }
        );
};

export default {
    updateMaster
}
