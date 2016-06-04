export class State {
    constructor() {
        this.state = {};
    }

    getState() {
        return this.state;
    }

    update(newState) {
        const self = this;
        console.log('new state', newState);
        Object
            .keys(newState)
            .forEach(key => {
                self.state[key] = newState[key];
            });
    }
}
