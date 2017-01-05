import React, { Component } from 'react'

import Ping from 'component/ping'
import StatusInfo from 'component/status-info'

import style from './style'

class Game extends Component {

    static displayName = '[page] game';

    render() {
        return(
            <div>
                <Ping className={style['page-game__ping']} />
                <StatusInfo className={style['page-game__status-info']} />
                123 GAME
            </div>
        )
    }

}

export { Game as default, style }
