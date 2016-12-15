import React, { Component, PropTypes } from 'react'

import style from './style'

class Login extends Component {

    static displayName = '[component] sign-in';

    static contextTypes = {
        store       : PropTypes.object.isRequired,
        transport   : PropTypes.object.isRequired
    };

    componentWillUnmount() {

    }

    onSubmit = e => {
        e.preventDefault();

        const $form     = e.currentTarget;
        const formData  = new FormData($form);
        const params    = {};

        formData.forEach((value, key) => params[key] = value);

        this.context.transport.sendObject({
            event   : 'connect:server',
            data    : {
                host: params['server-host'],
                port: params['server-port']
            }
        }, data => {
            console.log('aaaaaaaa', data)
        });
        // console.log(params)
    };

    render() {
        return(
            <form className={style['login']} onSubmit={this.onSubmit}>
                <input name="username" type="text" placeholder="Your username" />
                <input name="password" type="password" placeholder="Your password" />
                <input name="server-host" type="text" placeholder="Your game server ip" />
                <input name="server-port" type="number" min="1" max="65535" placeholder="Your game server port" />
                <button type="submit">Login</button>
            </form>
        )
    }

}

export { Login as default }
