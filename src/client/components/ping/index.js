import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import actions, { sendMaster } from './actions'
import reducer from './reducer'

import style from './style'

@connect((store) => ({
    iteration   : store.ping.iteration,
    timeSend    : store.ping.timeSend,
    timeReceive : store.ping.timeReceive,
    timeDiff    : store.ping.timeDiff,
    interval    : store.ping.interval
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

        return `${result}ms`
    }

    get interval() {
        if(this.props.interval) {
            const interval = this.props.interval / 1000;

            return `${interval}s`;
        }
    }

    get className() {
        let result = style['ping'];

        if(this.props.className) {
            result = `${result} ${this.props.className}`;
        }

        return result;
    }

    render() {
        return(
            <div className={this.className}>
                <strong className={style['ping__value']}>{this.diff}</strong>
                <span className={style['ping__iteration']}>{this.props.iteration}</span>
                <span className={style['ping__interval']}>{this.interval}</span>
            </div>
        )
    }

}

export { Ping as default, style, actions, reducer }
