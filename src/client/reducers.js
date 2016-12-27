import { combineReducers } from 'redux';

import { reducer as connect } from 'component/connect'
import { reducer as character } from 'component/character'
import { reducer as version } from 'component/version'
import { reducer as server } from 'component/server'
import { reducer as player } from 'component/player'
import { reducer as season } from 'component/season'
import { reducer as combat } from 'component/combat'
import { reducer as light } from 'component/light'

import { reducer as login } from 'component/login'
import { reducer as postLogin } from 'component/post-login'

export default combineReducers({
    connect,
    character,
    version,
    server,
    player,
    season,
    combat,
    light,

    login,
    postLogin
});
