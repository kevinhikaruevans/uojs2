import React, { Component, PropTypes } from 'react'

import style from './style'

class SignIn extends Component {

    static displayName = '[component] sign-in';

    static contextTypes = {
        store : PropTypes.object.isRequired
    };

    componentWillUnmount() {

    }

    onSubmit = e => {
        e.preventDefault();

        const $form     = e.currentTarget;
        const formData  = new FormData($form);
        const params    = {};

        formData.forEach((value, key) => params[key] = value);

        console.log(params)
    };

    render() {
        return(
            <form className={style['sign-in']} onSubmit={this.onSubmit}>
                <input name="username" type="text" placeholder="Your username" />
                <input name="password" type="password" placeholder="Your password" />
                <button type="submit">Login</button>
            </form>
        )
    }

}

export { SignIn as default }
