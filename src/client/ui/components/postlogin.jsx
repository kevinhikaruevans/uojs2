import React, { Component, PropTypes } from 'react';

export default class PostLoginComponent
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
    handleCharacterClick = (index) => () => {
        this.props.handlers.login.chooseCharacter(index);
    }
    render() {
        if (!this.props.login.user.characters) {
            return (
                <div>
                    connecting? :l
                </div>
            );
        }
        const characters = this.props.login.user.characters.map((character, index) => {
            if (!character.name) {
                return null;
            }
            return (
                <div key={index}>
                    <button onClick={this.handleCharacterClick(index)}>
                        {index + 1}.{' '}
                        {character.name}
                    </button>
                </div>
            );
        });
        return (
            <div>
                <h3>choose dat char</h3>
                {characters}
            </div>
        );
    }
}
