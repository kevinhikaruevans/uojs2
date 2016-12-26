import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import actions, { remove, create, selected } from './actions'
import reducer from './reducer'

import style from './style'

@connect(store => ({
    removeError : store.character.removeError
}))
class Character extends Component {

    static displayName = '[component] character';

    static propTypes = {
        index       : PropTypes.number.isRequired,
        name        : PropTypes.string,
        password    : PropTypes.string,
        removeError : PropTypes.object
    };

    get isDisabled() {
        return !this.props.name;
    }

    get isError() {
        const errors = this.props.removeError;

        return !!(errors && errors[this.props.index]);
    }

    get error() {
        const errors = this.props.removeError;

        return errors[this.props.index];
    }

    get name() {
        // @TODO: i18n
        let result = 'Create character this slot.';

        if(this.props.name) {
            result = this.props.name;
        }

        return result;
    }

    onClickDelete = e => {
        e.preventDefault();

        this.props.dispatch(
            remove({
                index   : this.props.index,
                password: this.props.password
            })
        )
    };

    onClickSelected = e => {
        e.preventDefault();

        if(!this.isDisabled) {
            this.props.dispatch(
                selected({
                    name    : this.props.name,
                    password: this.props.password,
                    slot    : this.props.index
                })
            )
        } else {
            this.props.dispatch(
                create()
            )
        }
    };

    get elDelete() {
        if(!this.isDisabled) {
            return <div className={style['character__delete']} onClick={this.onClickDelete}>✕</div>
        }
    }

    get elError() {
        if(this.isError) {
            return <div className={style['character__error']}>{`[code: ${this.error.code}] ${this.error.message}`}</div>
        }
    }

    render() {
        return(
            <div className={style['character']}>
                {this.elError}
                <div className={style['character__slot']} data-disabled={this.isDisabled} data-error={this.isError}>
                    <strong className={style['character__name']} onClick={this.onClickSelected}>{this.name}</strong>
                    {this.elDelete}
                </div>
            </div>
        )
    }
}

export { Character as default, style, actions, reducer };
