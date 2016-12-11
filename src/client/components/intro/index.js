import React, { Component } from 'react'

import style from './style'
import video from './video/intro.webm'

class Intro extends Component {

    static displayName = '[component] intro';

    render() {
        return(
            <div className={style['intro']}>
                <video className={style['intro__video']} src={video} autoPlay />
            </div>
        )
    }

}

export { Intro as default }
