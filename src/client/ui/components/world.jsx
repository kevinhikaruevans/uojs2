import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as worldActionCreators from '../../state/world/actions';
import MainScene from './scene';

class WorldComponent
    extends Component
{
    static propTypes = {
        handlers: PropTypes.object.isRequired
    }
    state = {
    }
    constructor(props) {
        super(props);
    }
    renderMessages() {
        const messages = this.props.world.messages.map((message, index) => {
            return (
                <div className="world-message" key={index}>
                    {message.name}: {message.message}
                </div>
            );
        });

        return (
            <div className="world-messages">
                {messages}
            </div>
        );
    }
    render() {
        return (
            <div className="world">
                <div className="world-overlay">
                    {this.renderMessages()}
                </div>
                <div className="world-view">
                    <MainScene />
                </div>
            </div>
        );
    }
}

export default connect(
    store => ({world: store.world})
    //dispatch => ({actions: bindActionCreators(worldActionCreators, dispatch)})
)(WorldComponent);
