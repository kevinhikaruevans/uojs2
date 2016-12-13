import React, { Component, PropTypes } from 'react';

export default class AlertComponent
    extends Component
{
    static propTypes = {
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    }
    state = {
        visible: true
    }
    render() {
        if (!this.state.visible) {
            return null;
        }
        return (
            <div className="alert alert-danger" role="alert">
                <button className="close" onClick={() => this.setState({visible: false})}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4>{this.props.title}</h4>
                <div>{this.props.message}</div>
            </div>
        );
    }
}
