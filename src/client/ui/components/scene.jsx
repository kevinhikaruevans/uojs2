import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import ReactDOM from 'react-dom';

export default class MainScene
    extends Component
{
    constructor(props, context) {
        super(props, context);

        //this.cameraPosition = new THREE.Vector3(200, 100, 200);
        //this.cameraRotation = new THREE.Euler(10, 0.5, 0.5);
        this.state = {
          cameraPosition: new THREE.Vector3(0, 0, 0),
          meshPosition: new THREE.Vector3(10, 10, 10)
        };

        this.onAnimate = () => {
            //console.log(this.refs);
            var timer = Date.now() * 0.0001;

            this.state.cameraPosition.x = Math.cos(timer) * 200;
            this.state.cameraPosition.y = Math.sin(timer) * 200;
            this.setState({
                cameraPosition: this.state.cameraPosition,
                meshPosition: new THREE.Vector3(
                    this.state.meshPosition.x,
                    this.state.meshPosition.y,
                    this.state.meshPosition.z
                )
            });
        };
    }
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const cameraPosition = this.refs.scene ? this.state.meshPosition : new THREE.Vector3();
        //console.log(this.refs.camera.position)
        return (
            <React3
                mainCamera="camera"
                onAnimate={this.onAnimate}
                width={width}
                height={height}
            >
                <scene ref="scene">
                    <orthographicCamera
                        name="camera"
                        ref="camera"
                        left={width / -2}
                        right={width / 2}
                        top={height / 2}
                        bottom={height / -2}
                        near={-100}
                        far={100}
                        position={this.state.cameraPosition}
                        lookAt={this.state.meshPosition}
                    >
                        <mesh
                            position={this.state.meshPosition}
                        >
                          <boxGeometry
                            width={100}
                            height={100}
                            depth={100}
                          />
                          <meshBasicMaterial
                            color={0xfff000}
                          />
                        </mesh>
                    </orthographicCamera>
                </scene>
            </React3>
        );
    }
}
