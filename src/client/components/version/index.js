import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import actions, { set } from './actions'
import reducer from './reducer'

@connect(store => ({
    selected: store.version.selected,
    list    : store.version.list
}))
class Version extends Component {

    static displayName = '[component] version';

    static defaultProps = {
        list    : [],
        selected: 0
    };

    static propTypes = {
        list    : PropTypes.array,
        selected: PropTypes.number
    };

    onChange = e => {
        const index = parseInt(e.currentTarget.value, 10);

        this.props.dispatch(
            set({ index })
        )
    };

    render() {
        return(
            <select defaultValue={this.props.selected} onChange={this.onChange}>
                {this.props.list.map((version, index) => {
                    return <option key={index} value={index}>{version}</option>
                })}
            </select>
        )
    }

}

export { Version as default, actions, reducer };
