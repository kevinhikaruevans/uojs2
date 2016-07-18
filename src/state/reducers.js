import { combineReducers } from 'redux';
import login from './login/reducers';
import world from './world/reducers';
import player from './player/reducers';

/*
    I wonder if there is a way to automate this, like read the "directory" and just
    insert each entry into the combineReducers object.
*/
export default combineReducers({
    login,
    world,
    player
});
