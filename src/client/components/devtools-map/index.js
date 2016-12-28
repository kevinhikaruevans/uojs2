import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import MapTile from './maptile';
import style from './style'

@connect(store => ({
    tiles : store.map.tiles
}))
class DevtoolsMap extends Component {

    static displayName = '[component] devtools-map';

    static defaultProps = {
        tiles : []
    };

    static propTypes = {
        tiles : PropTypes.array
    };
    constructor() {
        super()

        this.cameraPosition = new THREE.Vector3(10, 10, 10)
        this.cameraRotation = new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI / 2)
        this.origin = new THREE.Vector3(0, 0, 0)
    }
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const tiles = this.props.tiles;

        return (
            <div className={style['devtools-map']}>
                <React3
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
                        <axisHelper size={10}/>
                        {tiles.map((tile, index) => {
                            const x = ~~(index / 8);
                            //const y = tile.Z; // index % 8;
                            const z = (tile.Z) / 10;
                            const y = (index % 8); // mapTile.Z;
                            const position = new THREE.Vector3(x, y, z);
                            const corners = [
                                tiles[index - 4],
                                tiles[index - 2],
                                tiles[index + 2],
                                tiles[index + 4]
                            ];

                            return (
                                <MapTile corners={corners} id={tile.ID} key={index} position={position} />
                            );
                        })}
                    </scene>
                </React3>
            </div>
        );
    }
}

export { DevtoolsMap as default, style };
