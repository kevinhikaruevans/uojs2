import React, { Component, PropTypes } from 'react';

import actions, { remove } from './actions'
import style from './style'

class Character extends Component {

    static displayName = '[component] character';

    static contextTypes = {
        store : PropTypes.object
    };

    static propTypes = {
        index   : PropTypes.number.isRequired,
        name    : PropTypes.string,
        password: PropTypes.string
    };

    get disabled() {
        return !this.props.name;
    }

    get name() {
        let result = 'Empty';

        if(this.props.name) {
            result = this.props.name;
        }

        return result;
    }

    onClickDelete = e => {
        e.preventDefault();

        // @TODO: GET ACTION
        console.log('DELETED CHARACTER');
        this.context.store.dispatch(remove({
            index   : this.props.index,
            password: this.props.password
        }))
    };

    onClickSelected = e => {
        e.preventDefault();

        if(!this.disabled) {
            // @TODO: Selected character & go game
            console.log('SELECTED');
        } else {
            // @TODO: Create character this slot
            console.log('CREATE CHARACTER');
        }
    };

    get elDelete() {
        if(!this.disabled) {
            return <div className={style['character__delete']} onClick={this.onClickDelete}>✕</div>
        }
    }

    render() {
        return(
            <div className={style['character']} data-disabled={this.disabled}>
                <strong className={style['character__name']} onClick={this.onClickSelected}>{this.name}</strong>
                {this.elDelete}
            </div>
        )
    }
}

export { Character as default, style };
