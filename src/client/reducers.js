import { combineReducers } from 'redux';

import { reducer as character } from 'component/character'

import { reducer as connect } from 'component/connect'
import { reducer as login } from 'component/login'
import { reducer as serverList } from 'component/server-list'
import { reducer as serverSelect } from 'component/server-select'
import { reducer as postLogin } from 'component/post-login'

export default combineReducers({
    character,

    connect,
    login,
    serverList,
    serverSelect,
    postLogin
});
