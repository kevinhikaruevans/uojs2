import React, { Component, PropTypes } from 'react'

import actions, { selectMaster } from './actions'
import reducer from './reducer'

import style from './style'

class CharacterSelect extends Component {

    static displayName = '[component] character-select';

    static contextTypes = {
        store   : PropTypes.object.isRequired
    };

    static propTypes = {
        name    : PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    };

    onClick = e => {
        e.preventDefault();

/*        this.context.store.dispatch(
            selectMaster(this.props.index)
        )*/
    };

    render() {
        return <li onClick={this.onClick}>{`${this.props.name} / ${this.props.password}`}</li>
    }

}

export { CharacterSelect as default, style, actions, reducer }
