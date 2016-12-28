import React, { Component, PropTypes } from 'react'

import Ping from 'component/ping'
import DevtoolsMap from 'component/devtools-map'

import style from './style'

class Game extends Component {

    static displayName = '[page] game';

    render() {
        return(
            <div>
                <Ping />
                <DevtoolsMap />
                123 GAME
            </div>
        )
    }

}

export { Game as default, style }
