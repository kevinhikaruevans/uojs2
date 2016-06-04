import { State } from './state';
import * as login from './handlers/login';

export class GlobalState {
    constructor() {
        this.login = new State();
        this.world = new State();
    }

    register(registry) {
        login.register(registry, this.login);
    }
}
