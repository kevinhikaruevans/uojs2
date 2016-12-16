import React, { Component, PropTypes } from 'react'
import { actions as actionsConnect } from 'component/connect'

import actions, { authMaster } from './actions'
import reducer from './reducer'
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

        const connect = this.context.store.dispatch(
            actionsConnect.connectMaster({
                host : params['host'],
                port : params['port']
            })
        );

        connect.then(
            result => {
                this.context.store.dispatch(
                    authMaster({
                        username : params['username'],
                        password : params['password']
                    })
                )
            }
        );
    };

    render() {
        return(
            <form className={style['login']} onSubmit={this.onSubmit}>
                <input name="username" type="text" placeholder="Your username" defaultValue={this.state.username} autoFocus={!this.state.username} />
                <input name="password" type="password" placeholder="Your password" autoFocus={this.state.username} />
                <input name="host" type="text" placeholder="Your game server ip" defaultValue={this.state.host} />
                <input name="port" type="number" min="1" max="65535" placeholder="Your game server port" defaultValue={this.state.port} />
                <button type="submit">Login</button>
            </form>
        )
    }

}

export { Login as default, actions, reducer }
