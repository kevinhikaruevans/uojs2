import React, { Component } from 'react';

import style from './style'

class DevtoolsCursore extends Component {

    static displayName = '[component] devtools-cursore';

    state = {
        x : 150,
        y : 150
    };

    onMouseMove = e => {
        const offset = {
            left    : e.currentTarget.offsetLeft + 200,
            top     : e.currentTarget.offsetTop
        };

        this.setState({
            x : e.clientX - offset.left,
            y : e.clientY - offset.top
        });
    };

    render() {
        return(
            <div className={style['devtools-cursore']} onMouseMove={this.onMouseMove}>
                <div className={style['devtools-cursore__cross']} style={{
                    left : `${this.state.x}px`,
                    top  : `${this.state.y}px`
                }} />
            </div>
        )
    }
}

export { DevtoolsCursore as default, style };
