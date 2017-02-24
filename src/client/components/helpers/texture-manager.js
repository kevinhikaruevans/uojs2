import { TextureLoader } from 'three'
import config from 'config'

class Textures {

    storage = {};

    loader = new TextureLoader();

    constructor() {
        this.loader.setCrossOrigin('');
    }

    _loadProgress = (xhr) => {
        console.log('progress', xhr)
    };

    getTexture = (id) => {
        return new Promise((resolve, reject) => {
            if(!id) {
                reject('No `ID` passed argument')
            } else {
                if(this.storage[id]) {
                    resolve(this.storage[id]);
                } else {
                    this.loader.load(`http://${config['server.host']}/texture/${id}`, (texture) => {
                        this.storage[id] = texture;

                        resolve(texture);
                    }, this._loadProgress, reject)
                }
            }
        });
    }

}

export default Textures;
