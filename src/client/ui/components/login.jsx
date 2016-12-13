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
    handleErrorDismiss = () => {
        this.props.networkActions.dismissError();
    }
    renderModal = () => {
        return (
            <AlertComponent title="Network Error" onDismiss={this.handleErrorDismiss}>
                {this.props.network.error}
            </AlertComponent>
        );
    }
    render() {
        console.log(this.props);
        const isConnecting = this.props.network.connecting;
        const modal = this.props.network.error ? this.renderModal() : null;
        return (
            <div className="col-sm-4 offset-sm-4">
                {modal}
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
                    disabled={isConnecting}
                    onClick={this.handleLoginClick}
                >
                    {isConnecting ? 'Connecting...' : 'Login'}
                </button>
            </div>
        );
    }
}
