import React, { Component, PropTypes } from 'react';

export default class AlertComponent
    extends Component
{
    static propTypes = {
        children: PropTypes.node.isRequired,
        title: PropTypes.string.isRequired,
        onDismiss: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="alert alert-danger" role="alert">
                <button className="close" onClick={this.props.onDismiss}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4>{this.props.title}</h4>
                <div>{this.props.children}</div>
            </div>
        );
    }
}
