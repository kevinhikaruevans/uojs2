import { combineReducers } from 'redux';

import { reducer as connect } from 'component/connect'
import { reducer as character } from 'component/character'
import { reducer as version } from 'component/version'
import { reducer as server } from 'component/server'

import { reducer as login } from 'component/login'
// import { reducer as serverSelect } from 'component/server-select'
import { reducer as postLogin } from 'component/post-login'

export default combineReducers({
    connect,
    character,
    version,
    server,

    login,
    // serverSelect,
    postLogin
});
