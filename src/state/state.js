export class State {
    constructor(initialState) {
        this.state = initialState || {};
        this.listeners = [];
    }
    get(key) {
        return this.state[key];
    }
    getState() {
        return this.state;
    }

    addEventListener(eventName, callback) {
        /*
         implement a really shitty event listener system...
         this should be replaced with an actual event listener library, but this
         will work fine for now...
        */
        this.listeners.push({
            eventName,
            callback
        });
    }
    update(newState, eventName) {
        const self = this;
        Object
            .keys(newState)
            .forEach(key => {
                self.state[key] = newState[key];
            });

        if (eventName) {
            // execute any matching listener callbacks
            this.listeners
                .filter(listener => listener.eventName === eventName)
                .forEach(x => x.callback(newState));
        }
    }
}
