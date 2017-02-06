import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
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

    componentDidMount() {
        const renderer = new THREE.WebGLRenderer({
            canvas : this.refs.container,
            antialias : true
        });
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);


        const scene = new THREE.Scene();

        scene.add(this.axisHelper);

        renderer.render(scene, this.camera)
        // this.refs.container.appendChild(canvas.domElement);
    }

    get camera() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;
        const viewportSize = 16;

        const result = new THREE.OrthographicCamera(-1 * viewportSize * aspect, viewportSize * aspect, viewportSize, -1 * viewportSize, -100, 100);

        // result.setRotationFromEuler(this.cameraRotation);
        result.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z)
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
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;
        const viewportSize = 16;

        return <canvas ref="container" />
/*
        return (
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
        );
*/
    }
}

export { Scene as default }
