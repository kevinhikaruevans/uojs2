import React, { Component, PropTypes } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import { connect } from 'react-redux';
import actions from './actions'
import reducer from './reducer'
import MapTile from 'component/maptile'

class Map extends Component {
    static displayName = '[component] map';
    static propTypes = {
        tiles : PropTypes.array,
        x     : PropTypes.number,
        y     : PropTypes.number
    };

    static defaultProps = {
        tiles : [],
        x     : 0,
        y     : 0
    };

    get mapTiles() {
        const tiles = this.props.tiles;
        const selfX = this.props.x;
        const selfY = this.props.y;

        return tiles.map((row, _y) => {
            return row.map((tile, _x) => {
                const x = selfX - _x;
                const y = selfY - _y;
                const z = (tile.z) / 10;

                const props = {
                    position : new THREE.Vector3(x, y, z),
                    corners : [/*
                        tiles[_x][_y - 1],
                        tiles[_x - 1] ? tiles[_x - 1][_y] : null,
                        tiles[_x + 1] ? tiles[_x + 1][_y] : null,
                        tiles[_x][_y + 1],
                    */],
                    id: tile.id,
                    key : `${x}.${y}`
                };

                return <MapTile {...props} />
            })
        });
/*
        return tiles.reduce((arr, row, _x) => {
            return arr.concat(
                row.map((tile, _y) => {
                    const x = selfX - _x;
                    const y = selfY - _y;
                    //const x = ~~(index / 8);
                    //const y = tile.Z; // index % 8;
                    const z = (tile.z) / 10;
                    //const y = (index % 8); // mapTile.Z;
                    const position = new THREE.Vector3(x, y, z);
                    const corners = [
                        tiles[_x][_y - 1],
                        tiles[_x - 1] ? tiles[_x - 1][_y] : null,
                        tiles[_x + 1] ? tiles[_x + 1][_y] : null,
                        tiles[_x][_y + 1],
                    ];

                    return (
                        <MapTile
                            corners={corners}
                            id={tile.id}
                            key={`${x}.${y}`}
                            position={position}
                        />
                    );
                })
            );
        }, []);
*/
    }
    render() {

        /*
            TODO:
                - orthogonal camera
                - update camera position
                - zoom level
                - use range attribute? store this in redux store
                    - look for packet that sets range
         */

        return (
            <object3D>
                {this.mapTiles}
            </object3D>
        );
    }
}

export { Map as default, actions, reducer }
