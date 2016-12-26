import React, { Component, PropTypes } from 'react';

import actions, { select } from './actions'
import reducer from './reducer'

import style from './style'

class Server extends Component {

    static displayName = '[component] server';

    static contextTypes = {
        store   : PropTypes.object.isRequired
    };

    static propTypes = {
        index   : PropTypes.number.isRequired,
        id      : PropTypes.number,
        name    : PropTypes.string.isRequired,
        ip      : PropTypes.string
    };

    onClick = e => {
        e.preventDefault();

        this.context.store.dispatch(
            select(this.props.index)
        )
    };

    render() {
        return(
            <div className={style['server']} onClick={this.onClick}>
                {`[${this.props.id}] ${this.props.name} (${this.props.ip})`}
            </div>
        )
    }
}

export { Server as default, style, actions, reducer };
