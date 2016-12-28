import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class MapTile extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        position: PropTypes.object,
        // [{Z: 1, ID: 123}]:
        corners: PropTypes.array.isRequired
    }
    static displayName = '[component] maptile';

    static defaultProps = {
        tiles : []
    };

    static propTypes = {
        tiles : PropTypes.array
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
                <meshBasicMaterial>
                    <texture
                        magFilter={THREE.NearestFilter}
                        minFilter={THREE.NearestFilter}
                        url={`http://107.161.24.129:2590/land?id=${this.props.id}`}
                    />
                </meshBasicMaterial>
            </mesh>
        );
    }
}

export { MapTile as default };
