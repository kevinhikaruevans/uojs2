import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import actions, { selectMaster } from './actions'
import reducer from './reducer'
import style from './style'

class ServerSelect extends Component {

    static displayName = '[component] server-select';

    static contextTypes = {
        store   : PropTypes.object.isRequired
    };

    static propTypes = {
        id      : PropTypes.number,
        index   : PropTypes.number.isRequired,
        name    : PropTypes.string.isRequired,
        ip      : PropTypes.string.isRequired
    };

    onClick = e => {
        e.preventDefault();

        this.context.store.dispatch(
            selectMaster(this.props.index)
        )
    };

    render() {
        return <li onClick={this.onClick}>{`[${this.props.id}] ${this.props.name} / ${this.props.ip}`}</li>
    }

}

export { ServerSelect as default, actions, reducer }
