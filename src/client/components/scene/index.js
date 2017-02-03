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

    state = {
        cameraRotation: null
    }
    constructor(props) {
        super(props);
        this.cameraRotation = new THREE.Euler(0.05, 0, 0);
        this.cameraPosition = new THREE.Vector3(0, 0, 0);
        this.worldRotation = new THREE.Euler(0, 0, -1 * Math.PI / 4);
    }
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;
        const viewportSize = 16;

        return (<React3
                    alpha
                    antialias={false}
                    mainCamera="camera"
                    width={width}
                    height={height}
                >
                    <scene>
                        <orthographicCamera
                            name="camera"
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
        );
    }
}

export { Scene as default }
