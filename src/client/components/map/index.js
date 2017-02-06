import React, { Component, PropTypes } from 'react'
import * as THREE from 'three'
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
        console.log('tiles', tiles);

        return tiles.reduce((arr, row, _x) => {
            return arr.concat(
                row.map((tile, _y) => {
                    const x = _x - selfX;
                    const y = selfY - _y;
                    const z = tile.z;
                    const position = new THREE.Vector3(x, y, z);
                    const sides = [
                        tiles[_x - 1] ? tiles[_x - 1][_y] : null,
                        tiles[_x][_y - 1],
                        tiles[_x][_y + 1],
                        tiles[_x + 1] ? tiles[_x + 1][_y] : null
                    ]
                    const corners = [
                        tiles[_x - 1] ? tiles[_x - 1][_y - 1] : null,
                        tiles[_x - 1] ? tiles[_x - 1][_y + 1] : null,
                        tiles[_x + 1] ? tiles[_x + 1][_y - 1] : null,
                        tiles[_x + 1] ? tiles[_x + 1][_y + 1] : null
                    ];

                    return (
                        <MapTile corners={corners}
                            sides={sides}
                            id={tile.id}
                            key={`${x}.${y}`}
                            position={position}
                        />
                    );
                })
            );
        }, []);
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
