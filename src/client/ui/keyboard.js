export class KeyboardHandler {
    constructor() {
        document.addEventListener('keyup', this.handleKey, false);
    }

    handleKey = (event) => {
        const key = event.key;
        //TODO
    }
}
