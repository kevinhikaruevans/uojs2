import React, { Component, PropTypes } from 'react';

import style from './style'

class Devtools extends Component {

    static displayName = '[component] devtools';

    state = {
        x : localStorage.getItem('devtools-x') === 'true',
        y : localStorage.getItem('devtools-y') === 'true'
    };

    render() {
        return(
            <div className={style['devtools']} data-x={this.state.x} data-y={this.state.y}>
                <div>Button</div>
                <div></div>
            </div>
        )
    }
}

export { Devtools as default, style };
