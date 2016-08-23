import { requestAnimationFrame, cancelAnimationFrame } from './animationHelper';
import * as THREE from 'three';
console.log('3', THREE);

export class Renderer {
    constructor(target, store) {
        this.target = target;
        this.store = store;
        this.lastAnimationFrame = -1;

        this.initialize();
    }

    initialize = () => {
        const width = this.target.clientWidth;
        const height = this.target.clientHeight;
        console.log('width, height', width, height);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.target.appendChild(this.renderer.domElement);
        this.store.subscribe(this.requestDraw);
    }

    requestDraw = () => {
        const state = this.store.getState();

        cancelAnimationFrame(this.lastAnimationFrame);
        requestAnimationFrame(this.draw(state));
    }

    draw = (state) => () => {
        console.log('draw()');
        console.log(state);
    }
}
