import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import { connect } from 'react-redux';
import Map from 'component/map';
import MapTile from 'component/maptile'


@connect((store) => ({
    tiles : store.map.tiles,
    x     : store.map.x,
    y     : store.map.y
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
    constructor(props) {
        super(props);

        this.cameraPosition = new THREE.Vector3(10, 10, 10);
        this.cameraRotation = new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI / 2);
        this.origin         = new THREE.Vector3(0, 0, 0);
    }

    state = {
        test : 0
    }
    shouldComponentUpdate(nextState, nextProps) {
        console.log(nextState, nextProps);
        return true;
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

    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        //const { x, y, tiles } = this.props;
        const tiles = this.props.tiles || [];
        const selfX = this.props.x;
        const selfY = this.props.y;

        const renderedTiles = tiles.reduce((arr, row, _x) => {
            return arr.concat(
                row.map((tile, _y) => {
                    const x = selfX - _x;
                    const y = selfY - _y;
                    //const x = ~~(index / 8);
                    //const y = tile.Z; // index % 8;
                    const z = (tile.z) / 10;
                    //const y = (index % 8); // mapTile.Z;
                    const position = new THREE.Vector3(x, y, z);
                    const corners = [
                        tiles[_x][_y - 1],
                        tiles[_x - 1] ? tiles[_x - 1][_y] : null,
                        tiles[_x + 1] ? tiles[_x + 1][_y] : null,
                        tiles[_x][_y + 1],
                    ];

                    return (
                        <MapTile id={tile.id} position={position} corners={corners} />
                    );
                })
            );
        }, []);
        return (<React3
                    alpha
                    antialias
                    mainCamera="camera"
                    width={width}
                    height={height}
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
                            {renderedTiles}
                        </object3D>
                    </scene>
                </React3>
        );
    }
}

export { Scene as default }
