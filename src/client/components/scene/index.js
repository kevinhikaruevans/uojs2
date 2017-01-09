import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import { connect } from 'react-redux';
import Map from 'component/map';

class Scene extends Component {

    static displayName = '[component] scene';

    get content() {
        return null;
    }
    constructor() {
        super();

        this.cameraPosition = new THREE.Vector3(10, 10, 10);
        this.cameraRotation = new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI / 2);
        this.origin         = new THREE.Vector3(0, 0, 0);
    }
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        return (
            <div>
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
                        <axisHelper size={10} />
                        <Map />
                    </scene>
                </React3>
            </div>
        );
    }
}

export { Scene as default }
