import { State } from './state';
import * as login from './handlers/login';
import * as postlogin from './handlers/postlogin';

export class GlobalState {
    constructor() {
        this.login = new State();
        this.postlogin = new State();
        this.world = new State();
    }

    register(registry) {
        login.register(registry, this.login);
        postlogin.register(registry, this.postlogin);
    }
}
