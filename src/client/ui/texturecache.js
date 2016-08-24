import * as THREE from 'three';
import TextureClassItem from './texturecacheitem';

export class TextureCache {
    static cache = {};
    static textureLoader = new THREE.TextureLoader();
    static preload = () => {
        //textureLoader.load()
    }
    static load = () => {

    }
}
