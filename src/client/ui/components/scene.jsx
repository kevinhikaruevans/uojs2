import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import ReactDOM from 'react-dom';

export default class MainScene
    extends Component
{
    constructor(props, context) {
        super(props, context);

        this.cameraPosition = new THREE.Vector3(200, 100, 200);
        this.state = {
          cubeRotation: new THREE.Euler(),
        };

        this._onAnimate = () => {
          // we will get this callback every frame

          // pretend cubeRotation is immutable.
          // this helps with updates and pure rendering.
          // React will be sure that the rotation has now updated.
          this.setState({
            cubeRotation: new THREE.Euler(
              this.state.cubeRotation.x + 0.1,
              this.state.cubeRotation.y + 0.1,
              0
            ),
          });
        };
    }
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;

/*
this.camera = new THREE.OrthographicCamera(
    width / -2, //left
    width / 2, right
    height / 2,top
    height / -2,bottom
    -500,near
    1000f
*/
        return (
            <React3
                mainCamera="camera"
                onAnimate={this._onAnimate}
                width={width}
                height={height}
            >
                <scene>
                    <orthographicCamera
                        name="camera"
                        left={width / -2}
                        right={width / 2}
                        top={height / 2}
                        bottom={height / -2}
                        near={-500}
                        far={1000}
                    >
                        <mesh
                          rotation={this.state.cubeRotation}
                        >
                          <boxGeometry
                            width={1}
                            height={1}
                            depth={1}
                          />
                          <meshBasicMaterial
                            color={0x00ff00}
                          />
                        </mesh>
                    </orthographicCamera>
                </scene>
            </React3>
        );
    }
}
