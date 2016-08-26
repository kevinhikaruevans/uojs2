import React, { Component, PropTypes } from 'react';

export default class LoginComponent
    extends Component
{
    static propTypes = {
        handlers: PropTypes.object.isRequired
    }
    state = {
        username: 'testuser',
        password: 'testpassword'
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
        this.props.handlers.login.loginWithCredentials(this.state.username, this.state.password);
    }
    render() {
        console.log('Login render');
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
