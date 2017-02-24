import React, { Component, PropTypes } from 'react';
// import React3 from 'react-three-renderer';
import { Scene, WebGLRenderer, AxisHelper, Object3D, PlaneBufferGeometry, TextureLoader, MeshBasicMaterial, Mesh, Euler, OrthographicCamera } from 'three';

import { connect } from 'react-redux';
import Map from 'component/map';

@connect((store) => ({
    tiles : store.map.tiles,
    x     : store.map.x,
    y     : store.map.y
}))
class World extends Component {

    static displayName = '[component] scene';

    static propTypes = {
        tiles : PropTypes.array,
        x     : PropTypes.number,
        y     : PropTypes.number
    };

    static defaultProps = {
        tiles : []
    };

    constructor(props) {
        super(props);


    }

    corner0 = (tiles, y, x) => {
    let count = 1;
    let sum = tiles[y][x].z;

    if(tiles[y][x - 1]) {
        count++;
        sum += tiles[y][x - 1].z;
    }

    if(tiles[y + 1] && tiles[y + 1][x - 1]) {
        count++;
        sum += tiles[y + 1][x - 1].z;
    }

    if(tiles[y + 1] && tiles[y + 1][x]) {
        count++;
        sum += tiles[y + 1][x].z;
    }

    return sum / count;
};

    corner1 = (tiles, y, x) => {
    let count = 1;
    let sum = tiles[y][x].z;

    if(tiles[y + 1] && tiles[y + 1][x]) {
        count++;
        sum += tiles[y + 1][x].z;
    }

    if(tiles[y + 1] && tiles[y + 1][x + 1]) {
        count++;
        sum += tiles[y + 1][x + 1].z;
    }

    if(tiles[y][x + 1]) {
        count++;
        sum += tiles[y][x + 1].z;
    }

    return sum / count;
};

    corner2 = (tiles, y, x) => {
    let count = 1;
    let sum = tiles[y][x].z;

    if(tiles[y][x - 1]) {
        count++;
        sum += tiles[y][x - 1].z;
    }

    if(tiles[y - 1] && tiles[y - 1][x - 1]) {
        count++;
        sum += tiles[y - 1][x - 1].z;
    }

    if(tiles[y - 1] && tiles[y - 1][x]) {
        count++;
        sum += tiles[y - 1][x].z;
    }

    return sum / count;
};

    corner3 = (tiles, y, x) => {
    let count = 1;
    let sum = tiles[y][x].z;

    if(tiles[y][x + 1]) {
        count++;
        sum += tiles[y][x + 1].z;
    }

    if(tiles[y - 1] && tiles[y - 1][x + 1]) {
        count++;
        sum += tiles[y - 1][x + 1].z;
    }

    if(tiles[y - 1] && tiles[y - 1][x]) {
        count++;
        sum += tiles[y - 1][x].z;
    }

    return sum / count;
};

    camera = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;
        const viewportSize = 16;

        const result = new OrthographicCamera(-1 * viewportSize * aspect, viewportSize * aspect, viewportSize, -1 * viewportSize, -100, 100);

        result.setRotationFromEuler(new Euler(Math.PI / 15, 0, 0));

        result.position.set(0, 0, 0)

        return result;
    };

    scene = new Scene();

    renderer = new WebGLRenderer({
        antialias : true
    });

    tiles = new Object3D();

    componentDidMount() {
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setSize(800, 600);

        this.refs.container.appendChild(this.renderer.domElement);


        const scene = this.scene;
        const iCamera = this.camera();

        this.iCamera = iCamera

        scene.add(new AxisHelper(10));

        for(let y = 0; y < this.props.tiles.length; y++) {
            let prevTileX = null;
            const centerY = Math.ceil(this.props.tiles.length / 2);

            for(let x = 0; x < this.props.tiles[y].length; x++) {
                const centerX = Math.ceil(this.props.tiles[y].length / 2);

                const geometry = new PlaneBufferGeometry(1, 1);

                let vert = [];

                if(!prevTileX) {
                    vert = [
                        this.corner0(this.props.tiles, y, x),
                        this.corner1(this.props.tiles, y, x),
                        this.corner2(this.props.tiles, y, x),
                        this.corner3(this.props.tiles, y, x)
                    ];
                } else {
                    vert = [
                        prevTileX[1],
                        this.corner1(this.props.tiles, y, x),
                        prevTileX[3],
                        this.corner3(this.props.tiles, y, x)
                    ];
                }
                prevTileX = vert;

                geometry.attributes.position.array = new Float32Array([
                    -0.5,  0.5, vert[0],
                    0.5,  0.5, vert[1],
                    -0.5, -0.5, vert[2],
                    0.5, -0.5, vert[3],
                ]);
                geometry.attributes.position.needsUpdate = true;

                const loader = new TextureLoader();
                loader.setCrossOrigin('')
                loader.load(`http://192.168.1.124/texture/${this.props.tiles[y][x].id}`, (texture) => {

                    texture.flipY = false;
                    const material = new MeshBasicMaterial({ map : texture });
                    const mesh = new Mesh(geometry, material);

                    mesh.position.set(x - (this.props.tiles[y].length - (this.props.tiles[y].length / 2)), y - (this.props.tiles.length - (this.props.tiles.length / 2)), 0);
                    if(centerY - 1 === y && centerX - 1 == x) {
                        console.log(mesh.position)
                        iCamera.position.set(mesh.position.x, mesh.position.y, mesh.position.z)
                    }
                    this.tiles.add(mesh);
                });
            }
        }

        this.tiles.setRotationFromEuler(new Euler(0, 0, -1 * Math.PI / 4)) // this.worldRotation
        scene.add(this.tiles);

        const render = () => {
            requestAnimationFrame(render);

            this.renderer.render(scene, iCamera)
        }
        render();

    }

    componentDidUpdate() {
        console.log(11111111111111, this.props)
        for(let y = 0; y < this.props.tiles.length; y++) {
            let prevTileX = null;
            const centerY = Math.ceil(this.props.tiles.length / 2);

            for(let x = 0; x < this.props.tiles[y].length; x++) {
                const centerX = Math.ceil(this.props.tiles[y].length / 2);

                const geometry = new PlaneBufferGeometry(1, 1);

                let vert = [];

                if(!prevTileX) {
                    vert = [
                        this.corner0(this.props.tiles, y, x),
                        this.corner1(this.props.tiles, y, x),
                        this.corner2(this.props.tiles, y, x),
                        this.corner3(this.props.tiles, y, x)
                    ];
                } else {
                    vert = [
                        prevTileX[1],
                        this.corner1(this.props.tiles, y, x),
                        prevTileX[3],
                        this.corner3(this.props.tiles, y, x)
                    ];
                }
                prevTileX = vert;

                geometry.attributes.position.array = new Float32Array([
                    -0.5,  0.5, vert[0],
                    0.5,  0.5, vert[1],
                    -0.5, -0.5, vert[2],
                    0.5, -0.5, vert[3],
                ]);
                geometry.attributes.position.needsUpdate = true;

                const loader = new TextureLoader();
                loader.setCrossOrigin('')
                loader.load(`http://192.168.1.124/texture/${this.props.tiles[y][x].id}`, (texture) => {

                    texture.flipY = false;
                    const material = new MeshBasicMaterial({ map : texture });
                    const mesh = new Mesh(geometry, material);

                    mesh.position.set(x - (this.props.tiles[y].length - (this.props.tiles[y].length / 2)), y - (this.props.tiles.length - (this.props.tiles.length / 2)), 0);
                    if(centerY - 1 === y && centerX - 1 == x) {
                        console.log(mesh.position)
                        this.iCamera.position.set(mesh.position.x, mesh.position.y, mesh.position.z)
                    }
                    this.tiles.add(mesh);
                });
            }
        }

    }

    render() {
        return <div ref="container" />
    }
}

export { World as default }
