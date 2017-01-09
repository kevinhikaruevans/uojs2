import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import { connect } from 'react-redux';
import actions from './actions'
import reducer from './reducer'

import MapTile from 'component/maptile'

//import style from './style'

@connect((store) => ({
    tiles : store.map.tiles
}))
class Map extends Component {
    static displayName = '[component] map';
    static propTypes = {
        tiles : PropTypes.array
    };

    static defaultProps = {
        tiles : []
    };


    render() {
        const tiles = this.props.tiles;
        /*
            TODO:
                - orthogonal camera
                - update camera position
                - zoom level
                - use range attribute? store this in redux store
                    - look for packet that sets range
         */
        return (
            <object3d>
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
            </object3d>
        );
    }
}

export { Map as default, actions, reducer }
