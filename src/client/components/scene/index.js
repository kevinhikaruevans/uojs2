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


    constructor(props) {
        super(props);
        this.cameraRotation = new THREE.Euler(0.05, 0, Math.PI / 4);
    }

    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;
        const level = 100;
        const viewportSize = 15; // radius

        return (<React3
                    alpha
                    antialias
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
                        />
                        <axisHelper size={10} />
                        <Map tiles={this.props.tiles} x={this.props.x} y={this.props.y} />
                    </scene>
                </React3>
        );
    }
}

export { Scene as default }
