import React, { Component } from 'react';

import style from './style'

class DevtoolsCursore extends Component {

    static displayName = '[component] devtools-cursore';

    state = {
        x       : 150,
        y       : 150,
        cursor  : 'default',
        list    : [
            'col-resize',
            'default',
            'help',
            'move',
            'nesw-resize',
            'not-allowed',
            'nwse-resize',
            'pen',
            'row-resize',
            'target',
            'text',
            'wait',
            'war-mode'
        ]
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

    onClick = cursor => {
        return e => {
            e.preventDefault();

            this.setState({ cursor })
        }
    };

    render() {
        return(
            <div className={style['devtools-cursore']}>
                <div className={style['devtools-cursore__list']}>
                    {this.state.list.map((item, index) => {
                        return <div key={index} className={style['devtools-cursore__list-item']} data-cursor={item} data-selected={this.state.cursor === item} onClick={this.onClick(item)} />
                    })}
                </div>
                <div className={style['devtools-cursore__canvas']} data-cursor={this.state.cursor} onMouseMove={this.onMouseMove}>
                    <div className={style['devtools-cursore__cross']} style={{
                        left : `${this.state.x}px`,
                        top  : `${this.state.y}px`
                    }} />
                </div>
            </div>
        )
    }
}

export { DevtoolsCursore as default, style };
