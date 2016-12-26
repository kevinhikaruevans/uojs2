import { actions as server } from 'component/server'
import { actions as character } from 'component/character'

const middleware = history => ({ dispatch, getState }) => next => action => {
    switch(action.type) {
        case server.list.toString():
            history.push('/servers');
            break;
        case character.list.toString():
            history.push('/characters');
            break;
    }

    return next(action);
};

export default middleware;
