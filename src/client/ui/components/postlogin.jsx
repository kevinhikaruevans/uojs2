import React, { Component, PropTypes } from 'react';

export default class PostLoginComponent
    extends Component
{
    static propTypes = {
        handlers: PropTypes.object.isRequired,
        login: PropTypes.shape({
            characters: PropTypes.array
        }).isRequired
    }
    state = {
    }
    shouldComponentUpdate(nextProps) {
        console.log('nextProps', nextProps);
        return true;
    }
    handleCharacterClick = (index) => () => {
        this.props.handlers.login.chooseCharacter(index);
    }

    render() {
        const characters = this.props.login.user.characters || [];

        if (!characters.length) {
            return <h3>No characters available</h3>;
        }
        return (
            <div
                className="col-sm-4 offset-sm-4"
            >
                <h3>Choose your character</h3>
                {characters.map((character, index) => {
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
                })}
            </div>
        );
    }
}
