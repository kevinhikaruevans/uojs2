import Home from 'page/home'
import Servers from 'page/servers'
import Characters from 'page/characters'

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
}]
