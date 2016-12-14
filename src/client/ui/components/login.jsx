import React, { Component, PropTypes } from 'react';
import AlertComponent from './alert';

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
    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }
    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }
    handleLoginClick() {
        this.props.handlers.login.loginWithCredentials(this.state.username, this.state.password);
    }
    render() {
        const isConnecting = this.props.network.connecting;

        return (
            <form className="col-sm-4 offset-sm-4" onSubmit={() => this.handleLoginClick()}>
                {this.props.network.error && <AlertComponent title="Network Error" message={this.props.network.error} />}
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <input
                        className="form-control"
                        type="text"
                        value={this.state.username}
                        onChange={(event) => this.handleUsernameChange(event)}
                        placeholder="Username"
                    />
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.handlePasswordChange(event)}
                        placeholder="Password"
                    />
                </div>
                <button
                    className="btn btn-primary btn-block"
                    disabled={isConnecting}
                    onClick={() => this.handleLoginClick()}
                    type="submit"
                >
                    {isConnecting ? 'Connecting...' : 'Login'}
                </button>
            </form>
        );
    }
}
