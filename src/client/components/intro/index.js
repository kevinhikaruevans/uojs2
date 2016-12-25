import React, { Component, PropTypes } from 'react'

import style from './style'
import video from './video/intro.webm'

class Intro extends Component {

    static displayName = '[component] intro';

    static propTypes = {
        status : PropTypes.bool.isRequired
    };

    componentDidMount() {
        document.addEventListener('keyup', this.onExit);
    };

    componentWillUnmount() {
        document.removeEventListener('keyup', this.onExit);
    }

    onExit = e => {
        e.preventDefault();

        this.props.onExit && this.props.onExit(e);
    };

    render() {
        return(
            <div className={style['intro']} onClick={this.onExit}>
                <video className={style['intro__video']} src={video} autoPlay onEnded={this.onExit} />
            </div>
        )
    }

}

export { Intro as default, style }
