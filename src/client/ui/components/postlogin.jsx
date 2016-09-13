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

    renderCharacters = () => {
        if (!this.props.login.user.characters) {
            return (
                <div>No characters available.</div>
            );
        }

        return this.props.login.user.characters.map((character, index) => {
            if (!character.name) {
                return (
                    <div
                        key={index}
                    >
                        <button
                            className="btn btn-default btn-block"
                            disabled
                        >
                            <em>unused slot</em>
                        </button>
                    </div>
                );
            }
            return (
                <div
                    key={index}
                >
                    <button
                        className="btn btn-primary btn-block"
                        onClick={this.handleCharacterClick(index)}
                    >
                        {`${index + 1}. `}
                        {character.name}
                    </button>
                </div>
            )
        });
    }
    render() {
        return (
            <div
                className="col-sm-4 offset-sm-4"
            >
                <h3>Choose your character</h3>
                {this.renderCharacters()}
            </div>
        );
    }
}
