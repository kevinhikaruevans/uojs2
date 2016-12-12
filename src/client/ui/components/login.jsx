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
        return (
            <div className="col-sm-4 offset-sm-4">
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <input
                        className="form-control"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        placeholder="Username"
                    />
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        placeholder="Password"
                    />
                </div>
                <button
                    className="btn btn-primary btn-block"
                    onClick={this.handleLoginClick}
                >
                    Login
                </button>
            </div>
        );
    }
}
