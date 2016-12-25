import { combineReducers } from 'redux';

import { reducer as connect } from 'component/connect'
import { reducer as login } from 'component/login'
import { reducer as serverList } from 'component/server-list'
import { reducer as serverSelect } from 'component/server-select'
import { reducer as postLogin } from 'component/post-login'
import { reducer as characterList } from 'component/character-list'

export default combineReducers({
    connect,
    login,
    serverList,
    serverSelect,
    postLogin,
    characterList
});
