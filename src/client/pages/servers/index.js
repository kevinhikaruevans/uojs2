import React, { Component, PropTypes } from 'react'

import ServerList from 'component/server-list'

import style from './style'

class Servers extends Component {

    static displayName = '[page] home';

    render() {
        return(
            <div>
                <ServerList />
            </div>
        )
    }

}

export { Servers as default, style }
