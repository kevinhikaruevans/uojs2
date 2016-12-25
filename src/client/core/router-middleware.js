import { actions as serverList } from 'component/server-list'
import { actions as character } from 'component/character'

const middleware = history => ({ dispatch, getState }) => next => action => {
    switch(action.type) {
        case serverList.list.toString():
            history.push('/servers');
            break;
        case character.list.toString():
            history.push('/characters');
            break;
    }

    return next(action);
};

export default middleware;
