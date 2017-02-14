import React, { Component, PropTypes } from 'react';
// import React3 from 'react-three-renderer';
import * as THREE from 'three';

import { connect } from 'react-redux';
import Map from 'component/map';

@connect((store) => ({
    tiles : store.map.tiles,
    x     : store.map.x,
    y     : store.map.y
}))
class Scene extends Component {

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

        this.cameraRotation = new THREE.Euler(Math.PI / 15, 0, 0);
        this.cameraPosition = new THREE.Vector3(0, 0, 0);
        // instead of rotating the camera along the Z axis, it might just be easiest
        // to rotate the world by pi/4 along the Z. then we can just rotate the camera
        // on the X axis.
        // more work is needed to align the 0.2 to the angle that the original client uses.
        this.worldRotation = new THREE.Euler(0, 0, -1 * Math.PI / 4);
    }

    componentDidUpdate() {
        const renderer = new THREE.WebGLRenderer({
            canvas : this.refs.container,
            antialias : true
        });
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth / 2, window.innerHeight);

        const scene = new THREE.Scene();

        scene.add(this.axisHelper);

        const group = new THREE.Object3D();

        for(let y in this.props.tiles) {
            for(let x in this.props.tiles[y]) {
                    console.log(1111111, y, x);
                    const x_ = x - this.props.x;
                    const y_ = this.props.y - y;
                    const z = this.props.tiles[y][x].z;

                    const sides = [
                        this.props.tiles[y_][x_ - 1],
                        this.props.tiles[y_ - 1] ? this.props.tiles[y_ - 1][x_] : null,
                        this.props.tiles[y_ + 1] ? this.props.tiles[y_ + 1][x_] : null,
                        this.props.tiles[y_][x_ + 1]
                    ];
                    const corners = [
                        this.props.tiles[y_ - 1] ? this.props.tiles[y_ - 1][x_ - 1] : null,
                        this.props.tiles[y_ + 1] ? this.props.tiles[y_ + 1][x_ - 1] : null,
                        this.props.tiles[y_ - 1] ? this.props.tiles[y_ - 1][x_ + 1] : null,
                        this.props.tiles[y_ + 1] ? this.props.tiles[y_ + 1][x_ + 1] : null
                    ];

                    const position = new THREE.Vector3(x_, y_, z);
/*
                    const props = {
                        position : new THREE.Vector3(x_, y_, z),
                        corners,
                        sides,
                        id: this.props.tiles[y][x].id,
                        key : `${x}.${y}`
                    };

                    return <MapTile {...props} />*/

                    const geometry = new THREE.PlaneBufferGeometry();

                    const tileZ    = position.z;

                    const zDeltas = [
                        0,
                        sides[3]   ? sides[3].z - tileZ   : 0,
                        sides[2]   ? sides[2].z - tileZ   : 0,
                        corners[3] ? corners[3].z - tileZ : 0,
                    ];

                    const vertices = [
                        -0.5,  0.5, zDeltas[0],
                        0.5,  0.5, zDeltas[1],
                        -0.5, -0.5, zDeltas[2],
                        0.5, -0.5, zDeltas[3],
                    ];

                    vertices.forEach((value, index) => { geometry.attributes.position.array[index] = value });

                    //do we need to force an update here?
                    geometry.verticesNeedUpdate = true;
                    geometry.attributes.position.needsUpdate = true;



                    /*
                                            <texture magFilter={THREE.LinearFilter}
                                                     minFilter={THREE.LinearFilter}
                                                     url={`http://107.161.24.129:2590/land?id=${~~this.props.id}`}
                                            />
                    */

                    const texture = new THREE.TextureLoader().load(`http://107.161.24.129:2590/land?id=${~~this.props.tiles[y][x].id}`);
                    texture.magFilter = THREE.LinearFilter;
                    texture.minFilter = THREE.LinearFilter;
                    console.log(texture)

                    const material = new THREE.MeshBasicMaterial({ map : texture });

                    const tile = THREE.Mesh(geometry, material);

                    group.add(tile);
                }
        }


        const world = new THREE.Object3D();
        world.setRotationFromEuler(this.worldRotation)
        world.add(group);
        scene.add(world);

        renderer.render(scene, this.camera)
        // this.refs.container.appendChild(canvas.domElement);
    }

    get camera() {
        const width = window.innerWidth / 2;
        const height = window.innerHeight;
        const aspect = width / height;
        const viewportSize = 16;

        const result = new THREE.OrthographicCamera(-1 * viewportSize * aspect, viewportSize * aspect, viewportSize, -1 * viewportSize, -100, 100);

        // result.setRotationFromEuler(this.cameraRotation);
        // result.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z)
        result.position.x = 100;
        // console.log(result.getWorldDirection(this.cameraPosition), this.cameraPosition);

        return result;
    }

    get axisHelper() {
        return new THREE.AxisHelper(10);
    }


    mapTile = () => {
        const geometry = new THREE.PlaneBufferGeometry();

        return new THREE.Mesh(geometry, material);
    };

    render() {
        const width = window.innerWidth / 2;
        const height = window.innerHeight;
        const aspect = width / height;
        const viewportSize = 16;

        return <canvas ref="container" />
 /*       return (
                <div style={{display: 'flex'}}>
                    <React3 alpha
                            antialias={true}
                            mainCamera="camera"
                            width={width}
                            height={height}
                    >
                        <scene>
                            <orthographicCamera name="camera"
                                                left={-1 * viewportSize * aspect}
                                                right={viewportSize * aspect}
                                                top={viewportSize}
                                                bottom={-1 * viewportSize}
                                                near={-100}
                                                far={100}
                                                rotation={this.cameraRotation}
                                                position={this.cameraPosition}
                            />
                            <axisHelper size={10} />
                            <object3D rotation={this.worldRotation}>
                                <Map tiles={this.props.tiles} x={this.props.x} y={this.props.y} />
                            </object3D>
                        </scene>
                    </React3>
                </div>
        );
 */   }
}

export { Scene as default }
