export class TextureClassItem {
    constructor(type, id) {
        this.type = type;
        this.id = id;
    }

    get url() {
        return `/${this.type}/${this.id}`;
    }
}
