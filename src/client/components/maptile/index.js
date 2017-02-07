/* eslint react/no-unused-prop-types: 0, react/no-string-refs: 0 */
import React, { Component, PropTypes } from 'react'
import * as THREE from 'three';

class MapTile extends Component {
    static propTypes = {
        id        : PropTypes.number,
        position  : PropTypes.object,
        corners   : PropTypes.array.isRequired,
        sides     : PropTypes.array.isRequired
    }
    static displayName = '[component] maptile';

    static defaultProps = {
        id : 1
    };
    updateVertices = (nextProps) => {

        console.info('updateVertices')
        const geometry = this.geo;
        const props    = nextProps || this.props;

        if (!geometry || !props) {
            return;
        }

        const tileZ    = props.position.z;
        const corners  = props.corners;
        const sides    = props.sides;

        const zDeltas = [
            0,
            sides[3]   ? sides[3].z - tileZ   : 0,
            sides[2]   ? sides[2].z - tileZ   : 0,
            corners[3] ? corners[3].z - tileZ : 0,
        ];

        const vertices = [
            -0.5,  0.5, zDeltas[0],
             0.5,  0.5, zDeltas[1],
            -0.5, -0.5, zDeltas[2],
             0.5, -0.5, zDeltas[3],
        ];

        vertices.forEach((value, index) => { geometry.attributes.position.array[index] = value });

        //do we need to force an update here?
        geometry.verticesNeedUpdate = true;
        geometry.attributes.position.needsUpdate = true;
    }
    updateUVs = () => {
        console.info('updateUVs')
        const geometry = this.geo;

        // the value is the approx. distance between each tile
        // since the "square" on the diamond is only an approximation, we need
        // expand the texture past the transparent pixels...
        // set it to 0.0 if you'd like to see what I mean...
        const delta = 0.04;
        // map to vertices on the "diamond" tile:
        geometry.attributes.uv.setXY( 3, 0.5,         0.0 + delta );
        geometry.attributes.uv.setXY( 2, 0.0 + delta, 0.5         );
        geometry.attributes.uv.setXY( 1, 1.0 - delta, 0.5         );
        geometry.attributes.uv.setXY( 0, 0.5,         1.0 - delta );
    }
    componentWillReceiveProps = (nextProps) => this.updateVertices(nextProps)

    componentDidMount = () => this.updateUVs()

    render() {
        return (
            <mesh position={this.props.position}>
                <planeBufferGeometry ref={(geo) => { this.geo = geo; }}
                    width={1}
                    height={1}
                />
                <meshBasicMaterial>
                    <texture magFilter={THREE.LinearFilter}
                        minFilter={THREE.LinearFilter}
                        url={`http://107.161.24.129:2590/land?id=${~~this.props.id}`}
                    />
                </meshBasicMaterial>
            </mesh>
        );
    }
}

export { MapTile as default }
