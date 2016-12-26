import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Server from 'component/server'

import style from './style'

@connect(store => ({
    list : store.server.list
}))
class Servers extends Component {

    static displayName = '[page] servers';

    static defaultProps = {
        list : []
    };

    static propTypes = {
        list : PropTypes.array
    };

    render() {
        return(
            <div className={style['page-server']}>
                {this.props.list.map(({ id, name, ip }, index) => {
                    const props = {
                        key : id,
                        index,
                        id,
                        name,
                        ip
                    };

                    return <Server {...props} />
                })}
            </div>
        )
    }

}

export { Servers as default, style }
