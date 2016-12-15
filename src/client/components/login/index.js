import React, { Component, PropTypes } from 'react'
import { actions as actionsConnect } from 'component/connect'

import style from './style'

class Login extends Component {

    static displayName = '[component] sign-in';

    static contextTypes = {
        store       : PropTypes.object.isRequired,
        transport   : PropTypes.object.isRequired
    };

    state = {
        username: localStorage.getItem('username'),
        host    : localStorage.getItem('server-host'),
        port    : localStorage.getItem('server-port')
    };

    componentWillUnmount() {

    }

    onSubmit = e => {
        e.preventDefault();

        const $form     = e.currentTarget;
        const formData  = new FormData($form);
        const params    = {};

        formData.forEach((value, key) => {
            params[key] = value;

            if(key !== 'password') {
                localStorage.setItem(key, value);
            }
        });

        this.context.store.dispatch(
            actionsConnect.connect(this.context.transport, {
                host : params['server-host'],
                port : params['server-port']
            })
        );
    };

    render() {
        return(
            <form className={style['login']} onSubmit={this.onSubmit}>
                <input name="username" type="text" placeholder="Your username" defaultValue={this.state.username} autoFocus={!this.state.username} />
                <input name="password" type="password" placeholder="Your password" autoFocus={this.state.username} />
                <input name="server-host" type="text" placeholder="Your game server ip" defaultValue={this.state.host} />
                <input name="server-port" type="number" min="1" max="65535" placeholder="Your game server port" defaultValue={this.state.port} />
                <button type="submit">Login</button>
            </form>
        )
    }

}

export { Login as default }
