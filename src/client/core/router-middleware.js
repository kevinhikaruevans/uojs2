import { actions as serverList } from 'component/server-list'
import { actions as characterList } from 'component/character-list'

const middleware = history => ({ dispatch, getState }) => next => action => {
    switch(action.type) {
        case serverList.list.toString():
            history.push('/servers');
            break;
        case characterList.characterList.toString():
            history.push('/characters');
            break;
    }

    return next(action);
};

export default middleware;
