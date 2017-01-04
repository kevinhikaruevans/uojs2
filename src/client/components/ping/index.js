import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import actions, { sendMaster, changeInterval } from './actions'
import reducer from './reducer'

import style from './style'

@connect((store) => ({
    iteration        : store.ping.iteration,
    timeSend         : store.ping.timeSend,
    timeReceive      : store.ping.timeReceive,
    timeDiff         : store.ping.timeDiff,
    intervalList     : store.ping.intervalList,
    intervalSelected : store.ping.intervalSelected
}))
class Ping extends Component {

    static displayName = '[component] ping';

    static propTypes = {
        className : PropTypes.string
    };

    componentWillMount() {
        this.props.dispatch(sendMaster());
    }

    get diff() {
        let result = this.props.timeDiff;

        if(!result) {
            result = 0;
        }

        // @TODO: i18n
        return `${result}ms`
    }

    get className() {
        let result = style['ping'];

        if(this.props.className) {
            result = `${result} ${this.props.className}`;
        }

        return result;
    }

    onChangeInterval = (e) => {
        const index = parseInt(e.currentTarget.value, 10);

        this.props.dispatch(changeInterval({
            index
        }))
    };

    get intervalList() {
        return(
            <select defaultValue={this.props.intervalSelected} className={style['ping__interval']} onChange={this.onChangeInterval}>
                {this.props.intervalList.map((interval, index) => {
                    // @TODO: i18n
                    return <option key={index} value={index}>{interval / 1000}s</option>
                })}
            </select>
        )
    }

    render() {
        return(
            <div className={this.className}>
                <strong className={style['ping__value']}>{this.diff}</strong>
                <span className={style['ping__iteration']}>{this.props.iteration}</span>
                {this.intervalList}
            </div>
        )
    }

}

export { Ping as default, style, actions, reducer }
