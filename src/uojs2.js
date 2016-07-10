import { GameSocket } from './network/gamesocket';
import { PacketRegistry } from './network/packetregistry';
import { createStore, applyMiddleware } from 'redux';
import reducers from './state/reducers';
import ReduxThunk from 'redux-thunk';

import { LoginHandler } from './state/login/login';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
const registry = new PacketRegistry();

var login = new LoginHandler(store);
login.register(registry);

const gameSocket = new GameSocket(store, registry);

store.subscribe(() => {
    const state = store.getState();

    if (!state)
        return;

    document.querySelector('#output').innerHTML = JSON.stringify(store.getState(), null, 2);

    /*
        the shit below is just trying to automate a user.

        once we get a UI or something, then we can remove this, since the users will be invoking the actions.
        right now, it's just like checking where we are in the state, then run certain actions to emulate a user.

        no idea if that makes any sense...
    */
    if (!state.login.user.loggedIn && state.login.user.key) {
        gameSocket.reconnect({
            key: state.login.user.key
        });
    }

    if (state.login.user.characters && state.login.user.characters.length && !state.login.user.hasChosenCharacter) {
        console.info('oh shit');
        login.chooseCharacter(gameSocket, 0);
    }


});
