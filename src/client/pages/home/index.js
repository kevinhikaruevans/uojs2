import React, { Component, PropTypes } from 'react'

import Login from 'component/login'

import style from './style'

class Home extends Component {

    static displayName = '[page] home';

    render() {
        return(
            <div>
                <Login />
            </div>
        )
    }

}

export { Home as default, style }
