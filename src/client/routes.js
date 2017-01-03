import Home from 'page/home'
import Servers from 'page/servers'
import Characters from 'page/characters'
import Game from 'page/game'

export default [{
    path    : '/',
    action  : () => Home
}, {
    // @TODO: Add protected handler
    path    : '/servers',
    action  : () => Servers
}, {
    // @TODO: Add protected handler
    path    : '/characters',
    action  : () => Characters
}, {
    // @TODO: Add protected handler
    path    : '/game',
    action  : () => Game
}]
