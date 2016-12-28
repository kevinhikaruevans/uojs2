import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import style from './style'

@connect(store => ({
    tiles : store.map.tiles
}))
class DevtoolsMap extends Component {

    static displayName = '[component] devtools-map';

    static defaultProps = {
        tiles : []
    };

    static propTypes = {
        tiles : PropTypes.array
    };

    render() {
        return(
            <div className={style['devtools-map']}>
                {this.props.tiles.map((tile, index) => {
                    return(
                        <div key={index} className={style['devtools-map__tile']}>
                            <img className={style['devtools-map__img']} src={`http://107.161.24.129:2590/land?id=${tile.ID}`} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export { DevtoolsMap as default, style };
