import { requestAnimationFrame, cancelAnimationFrame } from './animationHelper';
import * as THREE from 'three';
import { KeyboardHandler } from './keyboard';
import * as login from './login';

export class Renderer {
    constructor(target, handlers, store) {
        this.target = target;
        this.store = store;
        this.handlers = handlers;
        this.lastAnimationFrame = -1;

        this.initialize();
    }

    initialize = () => {
        login.showLoginForm();
        login.bind((username, password) => {
            login.hideLoginForm();
            this.handlers.login.loginWithCredentials(username, password);
            this.initializeTHREE();
        })
        this.initializeKeyboard();
        // draw whenever the store updates
        this.store.subscribe(this.requestDraw);
    }

    initializeKeyboard = () => {
        this.keyboardHandler = new KeyboardHandler();
    }

    initializeTHREE = () => {
        const width = this.target.clientWidth;
        const height = this.target.clientHeight;

        const scene = this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(
            width / -2,
            width / 2,
            height / 2,
            height / -2,
            -500,
            1000
        );

        this.scene.add(this.camera);
        this.camera.position.x = 200;
        this.camera.position.y = 100;
        this.camera.position.z = 200;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.target.appendChild(this.renderer.domElement);

        /*this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(
                500,
                160,
                160
            ),
            new THREE.MeshLambertMaterial({
              color: 0xFFFFFF
            })
        );
        this.scene.add(this.sphere);*/

        var size = 500, step = 50;

        var geometry = new THREE.Geometry();

        for ( var i = - size; i <= size; i += step ) {

            geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
            geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

            geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
            geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

        }

        var material = new THREE.LineBasicMaterial( { color: 0xFFFFFF, opacity: 0.2 } );

        var line = new THREE.LineSegments( geometry, material );
        scene.add( line );
        var ambientLight = new THREE.AmbientLight( 0x404040 );
        scene.add( ambientLight );
    }

    requestDraw = () => {
        if (!this.renderer) {
            return;
        }
        const state = this.store.getState();
        if (state && state.login.user.loggedIn) {
            cancelAnimationFrame(this.lastAnimationFrame);
            requestAnimationFrame(this.draw(state));
        }
    }

    draw = (state) => () => {
        this.camera.lookAt( this.scene.position );

        this.renderer.render(this.scene, this.camera);
        console.log('draw()');
        console.log(state);
    }

    drawMap = (state) => {

    }
}
