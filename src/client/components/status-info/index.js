import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import actions from './actions'
import reducer from './reducer'

import style from './style'

@connect((state) => ({
    id      : state.player.serial,
    health  : state.statusInfo.health,
    mana    : state.statusInfo.mana,
    stamina : state.statusInfo.stamina
}))
class StatusInfo extends Component {

    static displayName = '[component] status-info';

    static propTypes = {
        id : PropTypes.number,

        health : PropTypes.shape({
            current : PropTypes.number,
            max     : PropTypes.number
        }),
        mana : PropTypes.shape({
            current : PropTypes.number,
            max     : PropTypes.number
        }),
        stamina : PropTypes.shape({
            current : PropTypes.number,
            max     : PropTypes.number
        })
    };

    state = {
        minimize : !!localStorage.getItem(`status-info-minimize-${this.props.id}`)
    };

    get elShort() {
        if(true || this.state.minimize) {
            return(
                <div className={style['status-info__minimize']}>
                    <div className={style['status-info__bar-block']} data-label="Health">
                        <progress className={style['status-info__bar']} value={this.props.health.current} max={this.props.health.max} />
                    </div>
                    <div className={style['status-info__bar-block']} data-label="Mana">
                        <progress className={style['status-info__bar']} value={this.props.mana.current} max={this.props.mana.max} />
                    </div>
                    <div className={style['status-info__bar-block']} data-label="Stamina">
                        <progress className={style['status-info__bar']} value={this.props.stamina.current} max={this.props.stamina.max} />
                    </div>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.elShort}
            </div>
        )
    }

}

export { StatusInfo as default, style, actions, reducer }
