import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as THREE from 'three';

class MapTile extends Component {
    static propTypes = {
        id       : PropTypes.number.isRequired,
        position : PropTypes.object,
        corners  : PropTypes.array.isRequired
    }
    static displayName = '[component] maptile';

    static defaultProps = {
        id: 1
    };


    componentDidMount() {
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

    render() {
        return (
            <mesh
                position={this.props.position}
            >
                <planeBufferGeometry
                    width={1}
                    height={1}
                    ref="geo"
                />
                <meshBasicMaterial
                    >
                    <texture
                        magFilter={THREE.NearestFilter}
                        minFilter={THREE.NearestFilter}
                        url={`http://107.161.24.129:2590/land?id=${this.props.id}`}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onError={this.onError}
                    />
                </meshBasicMaterial>
            </mesh>
        );
    }
}

export { MapTile as default }
