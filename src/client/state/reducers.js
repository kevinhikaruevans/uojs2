import { combineReducers } from 'redux';
import _login from './login/reducers';
import world from './world/reducers';
import player from './player/reducers';
import network from './network/reducers';
import ping from './ping/reducers';

import { reducer as connect } from 'component/connect'
import { reducer as login } from 'component/login'
import { reducer as serverList } from 'component/server-list'
import { reducer as serverSelect } from 'component/server-select'
import { reducer as postLogin } from 'component/post-login'

/*
    I wonder if there is a way to automate this, like read the "directory" and just
    insert each entry into the combineReducers object.
*/
export default combineReducers({
    connect,
    login,
    serverList,
    serverSelect,
    postLogin,

    _login,
    world,
    player,
    network,
    ping
});
