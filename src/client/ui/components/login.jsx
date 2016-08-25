import React, { Component, PropTypes } from 'react';

export default class LoginComponent
    extends Component
{
    static propTypes = {

    }
    state = {
        username: '',
        password: ''
    }
    constructor(props) {
        super(props);
    }
    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    }
    handleLoginClick = () => {
        console.log('login', this.state);;
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    placeholder="Password"
                />
                <button onClick={this.handleLoginClick}>login</button>
            </div>
        );
    }
}
