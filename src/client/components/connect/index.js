import React, { Component, PropTypes } from 'react'

import actions, { setHost, setPort } from './actions'
import reducer from './reducer'

import style from './style'

class Connect extends Component {

    static displayName = '[component] connect';

    static contextTypes = {
        store : PropTypes.object.isRequired
    };

    state = {
        host : localStorage.getItem('host'),
        port : localStorage.getItem('port')
    };

    componentWillMount() {
        this.setHost(this.state.host);
        this.setPort(this.state.port);
    }

    setHost = (host) => {
        if(host) {
            this.context.store.dispatch(
                setHost({ host })
            );
        }
    };

    setPort = (port) => {
        if(port) {
            this.context.store.dispatch(
                setPort({ port })
            );
        }
    };

    onChangeHost = (e) => {
        const $input = e.currentTarget;

        if($input.checkValidity()) {
            const host = $input.value;

            this.setHost(host);
            localStorage.setItem('host', host);
        } else {
            // @TODO: Show error
            // $input.validity
        }
    };

    onChangePort = (e) => {
        const $input = e.currentTarget;

        if($input.checkValidity()) {
            const port = $input.value;

            this.setPort(port);
            localStorage.setItem('port', port);
        } else {
            // @TODO: Show error
            // $input.validity
        }
    };

    render() {
        return(
            <form className={style['connect']} onChange={this.onChange}>
                <input name="host" type="text" className={style['connect__host']} placeholder="Your game server ip" pattern="^(\d{1,3}\.){3}\d{1,3}$" defaultValue={this.state.host} onChange={this.onChangeHost} />
                <input name="port" type="number" min="1" max="65535" className={style['connect__port']} placeholder="Your game server port" defaultValue={this.state.port} onChange={this.onChangePort} />
            </form>
        )
    }

}

export { Connect as default, style, actions, reducer }
