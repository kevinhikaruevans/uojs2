import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import { actions as actionsConnect } from 'component/connect'

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
        password: localStorage.getItem('password')
    };

    onSubmit = e => {
        e.preventDefault();

        const $form     = e.currentTarget;
        const formData  = new FormData($form);
        const params    = {};

        // @TODO: FormData.forEach working only chrome :(
        formData.forEach((value, key) => {
            params[key] = value;

            if(__PRODUCTION__ && key !== 'password') {
                localStorage.setItem(key, value);
            }
        });

        const connect = this.props.dispatch(
            actionsConnect.connectMaster()
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
                <input name="username" type="text" placeholder="Your username" maxLength="30" defaultValue={this.state.username} autoFocus={!this.state.username} />
                <input name="password" type="password" placeholder="Your password" maxLength="30" defaultValue={this.state.password} autoFocus={this.state.username} />
                <button type="submit">Login</button>
            </form>
        )
    }

}

export { Login as default, actions, reducer }
