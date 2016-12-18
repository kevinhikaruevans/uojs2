import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import ServerSelect from 'component/server-select'

import actions  from './actions'
import reducer from './reducer'
import style from './style'

@connect(store => ({
    list : store.serverList.list
}))
class ServerList extends Component {

    static displayName = '[component] server-list';

    static propTypes = {
        list    : PropTypes.array.isRequired,
        status  : PropTypes.bool.isRequired
    };

    render() {
        return(
            <ul>
                {this.props.list.map(({ id, name, ip }, index) => {
                    const props = {
                        index,
                        id,
                        name,
                        ip,
                        key : id
                    };

                    return <ServerSelect {...props} />
                })}
            </ul>
        )
    }

}

export { ServerList as default, actions, reducer }
