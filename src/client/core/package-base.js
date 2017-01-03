class PackageBase {

    meta = {
        number      : null,
        description : null,
        length      : null,
        alias       : []
    };

    constructor(number, length, description, alias) {
        this.number = number;
        this.description = description;
        this.length = length;
        this.alias = alias;
    }

    get number() {
        return this.meta.number;
    }

    set number(number) {
        if(typeof number === 'number') {
            this.meta.number = number;
        }
    }

    get description() {
        return this.meta.description;
    }

    set description(string) {
        if(typeof string === 'string') {
            this.meta.description = string;
        }
    }

    get length() {
        return this.meta.length;
    }

    set length(number) {
        if(typeof number === 'number') {
            this.meta.length = number;
        }
    }

    get alias() {
        return this.meta.alias;
    }

    set alias(data) {
        if(data) {
            if(typeof data === 'string') {
                this.meta.alias.push(data);
            } else if(Array.isArray(data)) {
                this.meta.alias = this.meta.alias.concat(data);
            }
        }
    }

    create = () => {
        console.warn('Function `create` not declared: %o', this.meta);
    };

    action = () => {
        console.warn('Function `action` not declared: %o', this.meta);
    }

}

export default PackageBase;
