import React, { Component } from 'react'

import style from './style'
import video from './video/intro.webm'

class Intro extends Component {

    static displayName = '[component] intro';

    componentDidMount() {
        document.addEventListener('keyup', this.onExit);
        this.refs.video.addEventListener('ended', this.onExit);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.onExit);
        this.refs.video.removeEventListener('ended', this.onExit);
    }

    onExit = e => {
        e.preventDefault();

        this.props.onExit && this.props.onExit(e);
    };

    render() {
        return(
            <div className={style['intro']} onClick={this.onExit}>
                <video ref="video" className={style['intro__video']} src={video} autoPlay />
            </div>
        )
    }

}

export { Intro as default, style }
