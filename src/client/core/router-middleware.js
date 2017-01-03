import { actions as server } from 'component/server'
import { actions as character } from 'component/character'
import { actions as login } from 'component/login'

// history => ({ dispatch, getState }) => next => action =>
const middleware = (history) => () => (next) => (action) => {
    switch(action.type) {
        case server.list.toString():
            history.push('/servers');
            break;
        case character.list.toString():
            history.push('/characters');
            break;
        case login.complete.toString():
            history.push('/game');
            break;
    }

    return next(action);
};

export default middleware;
