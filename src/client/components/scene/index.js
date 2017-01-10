import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import { connect } from 'react-redux';
import Map from 'component/map';
import MapTile from 'component/maptile'


@connect((store) => ({
    tiles : store.map.tiles
}))
class Scene extends Component {

    static displayName = '[component] scene';

    static propTypes = {
        tiles : PropTypes.array
    };

    static defaultProps = {
        tiles : []
    };


    get content() {
        return null;
    }
    constructor() {
        super();

        this.cameraPosition = new THREE.Vector3(10, 10, 10);
        this.cameraRotation = new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI / 2);
        this.origin         = new THREE.Vector3(0, 0, 0);
    }

    state = {
        test : 0
    }

    onLoad = (...args) => {
        console.log('load', args);
    }

    onProgress = (...args) => {
        console.log('Progress', args)
    }
    onError = (...args) => {
        console.log('onError', args)
    }


    componentDidMount() {
/*
        const geometry = this.refs.geo;

        // map to vertices on the "diamond" tile:
        geometry.attributes.uv.setXY( 0, 1.0, 0.5 );
        geometry.attributes.uv.setXY( 1, 0.5, 0.0 );
        geometry.attributes.uv.setXY( 2, 0.5, 1.0 );
        geometry.attributes.uv.setXY( 3, 0.0, 0.5 );

        const tileZ = this.props.position.z;
        const corners = this.props.corners;

        // TODO: calculate Zs based on corner[...n].Z
        const vertices = [
            -0.5,  0.5, 0.0,
            0.5,  0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0
        ];

        vertices.forEach((value, index) => geometry.attributes.position.array[index] = value);

        // TODO: these might not be needed:
        geometry.attributes.position.needsUpdate = true;
        geometry.verticesNeedUpdate = true;
        geometry.dynamic = true;
*/
    }

    _animate = () => {
        this.setState({
            test : this.state.test + 1
        })
    }

    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        return (<React3
                    alpha
                    antialias
                    mainCamera="camera"
                    width={width}
                    height={height}

                    onAnimate={this._animate}
                >
                    <scene>
                        <perspectiveCamera
                            name="camera"
                            ref="camera"
                            fov={60}
                            aspect={width / height}
                            near={0.1}
                            far={1000}
                            lookAt={this.origin}
                            rotation={this.cameraRotation}
                            position={this.cameraPosition}
                        />
                        <axisHelper size={10} />
                        <object3D>
                            {this.props.tiles.map((tile, index) => {
                                const x = ~~(index / 8);
                                //const y = tile.Z; // index % 8;
                                const z = (tile.z) / 10;
                                const y = (index % 8); // mapTile.Z;
                                const position = new THREE.Vector3(x, y, z);
                                const corners = [
                                    this.props.tiles[index - 4],
                                    this.props.tiles[index - 2],
                                    this.props.tiles[index + 2],
                                    this.props.tiles[index + 4]
                                ];

                                // @TODO: maybe :))
                                {tile.map((item, index) => {
                                    const props = {
                                        key : index + '-' + item.id,
                                        id  : item.id,
                                        corners,
                                        position
                                    };

                                    return (
                                            <mesh position={position}>
                                                <planeBufferGeometry
                                                        width={10}
                                                        height={10}
                                                />
                                                <meshBasicMaterial>
                                                    <texture
                                                            magFilter={THREE.NearestFilter}
                                                            minFilter={THREE.NearestFilter}
                                                            url={`http://107.161.24.129:2590/land?id=${props.id}`}
                                                            onLoad={this.onLoad}
                                                            onProgress={this.onProgress}
                                                            onError={this.onError}
                                                    />
                                                </meshBasicMaterial>
                                            </mesh>
                                    )
                                })}
                            })}
                        </object3D>
                    </scene>
                </React3>
        );
    }
}

export { Scene as default }
