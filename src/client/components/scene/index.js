import React, { Component, PropTypes } from 'react';
// import React3 from 'react-three-renderer';
// import * as THREE from 'three';

import { connect } from 'react-redux';
// import Map from 'component/map';
// import MapTile from 'component/maptile'

import style from './style'

@connect((store) => ({
    tiles : store.map.tiles,
    x     : store.map.x,
    y     : store.map.y
}))
class Scene extends Component {

    static displayName = '[component] scene';

    static propTypes = {
        tiles : PropTypes.array
    };

    static defaultProps = {
        tiles : []
    };


    constructor(props) {
        super(props);
/*
        this.cameraPosition = new THREE.Vector3(10, 10, 10);
        this.cameraRotation = new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI / 2);
        this.origin         = new THREE.Vector3(0, 0, 0);*/
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.init();
    }

    textureCache = {};

    textureLoad = (id) => {
        let result = this.textureCache[id];

        if(!result) {
            result = new Image();
            result.src = `http://107.161.24.129:2590/land?id=${id}`;
            result.addEventListener('load', () => this.init);
            this.textureCache[id] = result;
        }

        return result;
    };

    init = () => {
        const ctx = this.refs.canvas.getContext('2d');

        for(let y in this.props.tiles) {
            for(let x in this.props.tiles[y]) {
                const coordinateX = x * 22;
                const correctX = (this.props.tiles[x].length * 22) - 394; // @TODO: pls normal calc correct X
                const correctY = (this.props.tiles.length * 22) - 600 / 2;

                ctx.drawImage(this.textureLoad(this.props.tiles[y][x].id), (coordinateX - (y * 22)) + correctX, ((y * 22) + coordinateX) - correctY);
            }
        }
    };

    render() {
        return(
            <div className={style['scene__root']}>
                <canvas ref="canvas" className={style['scene__canvas']} width="800" height="600" />
            </div>
        )
    }
/*
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        return (<React3
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
                        <Map tiles={this.props.tiles} x={this.props.x} y={this.props.y} />
                    </scene>
                </React3>
        );
    }*/
}

export { Scene as default }
