import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import { actions as actionsConnect } from 'component/connect'
import Version from 'component/version'

import actions, { authMaster } from './actions'
import reducer from './reducer'
import style from './style'

@connect(store => ({
    error : store.login.error
}))
class Login extends Component {

    static displayName = '[component] login';

    static propTypes = {
        error : PropTypes.string
    };

    state = {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        host    : localStorage.getItem('host'),
        port    : localStorage.getItem('port')
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

            if(__PRODUCTION__ && key !== 'password') {
                localStorage.setItem(key, value);
            }
        });

        const connect = this.props.dispatch(
            actionsConnect.connectMaster({
                host : params['host'],
                port : params['port']
            })
        );

        connect.then(
            result => {
                this.props.dispatch(
                    authMaster({
                        username : params['username'],
                        password : params['password']
                    })
                )
            }
        );
    };

    get elError() {
        if(this.props.error) {
            return <div>{this.props.error}</div>
        }
    }

    render() {
        return(
            <form className={style['login']} onSubmit={this.onSubmit}>
                {this.elError}
                <input name="username" type="text" placeholder="Your username" defaultValue={this.state.username} autoFocus={!this.state.username} />
                <input name="password" type="password" placeholder="Your password" defaultValue={this.state.password} autoFocus={this.state.username} />
                <input name="host" type="text" placeholder="Your game server ip" defaultValue={this.state.host} />
                <input name="port" type="number" min="1" max="65535" placeholder="Your game server port" defaultValue={this.state.port} />
                <Version />
                <button type="submit">Login</button>
            </form>
        )
    }

}

export { Login as default, actions, reducer }
