import React, { Component } from 'react'

import Login from 'component/login'
import Connect from 'component/connect'
import Version from 'component/version'

import style from './style'

class Home extends Component {

    static displayName = '[page] home';

    render() {
        return(
            <div>
                <Login />
                <Connect />
                <Version />
            </div>
        )
    }

}

export { Home as default, style }
