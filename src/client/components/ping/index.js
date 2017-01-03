import React, { Component } from 'react'
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

    componentWillMount() {
        this.props.dispatch(sendMaster());
    }

    render() {
        return <div>ping</div>
    }

}

export { Ping as default, style, actions, reducer }
