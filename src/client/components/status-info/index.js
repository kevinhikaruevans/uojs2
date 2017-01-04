import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import actions from './actions'
import reducer from './reducer'

import style from './style'

@connect((state) => ({
    id              : state.statusInfo.serial,
    health          : state.statusInfo.health,
    mana            : state.statusInfo.mana,
    weight          : state.statusInfo.mana,
    stamina         : state.statusInfo.stamina,
    playerName      : state.statusInfo.playerName,
    strength        : state.statusInfo.strength,
    dexterity       : state.statusInfo.dexterity,
    intelligence    : state.statusInfo.intelligence,
    statCap         : state.statusInfo.statCap,
    luck            : state.statusInfo.luck,
    damage          : state.statusInfo.damage,
    followers       : state.statusInfo.followers,
    gold            : state.statusInfo.gold,
    resist          : state.statusInfo.resist
}))
class StatusInfo extends Component {

    static displayName = '[component] status-info';

    static propTypes = {
        id              : PropTypes.number,
        strength        : PropTypes.number,
        dexterity       : PropTypes.number,
        intelligence    : PropTypes.number,
        statCap         : PropTypes.number,
        luck            : PropTypes.number,
        playerName      : PropTypes.string,

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
        }),
        weight : PropTypes.shape({
            current : PropTypes.number,
            max     : PropTypes.number
        }),
        damage : PropTypes.shape({
            min : PropTypes.number,
            max : PropTypes.number
        }),
        followers : PropTypes.shape({
            current : PropTypes.number,
            max     : PropTypes.number
        }),
        resist : PropTypes.shape({
            cold    : PropTypes.number,
            energy  : PropTypes.number,
            fire    : PropTypes.number,
            poison  : PropTypes.number
        })
    };

    state = {
        minimize : localStorage.getItem(`status-info-minimize-${this.props.id}`) === 'true'
    };

    onToggleMinimize = (e) => {
        e.preventDefault();

        this.setState({
            minimize : !this.state.minimize
        }, () => {
            localStorage.setItem(`status-info-minimize-${this.props.id}`, this.state.minimize)
        })
    };

    get elShort() {
        return(
            <div className={style['status-info__minimize']} onDoubleClick={this.onToggleMinimize}>
                <div className={style['status-info__bar-block']} data-label="H">
                    <progress className={`${style['status-info__bar']} ${style['status-info__bar_health']}`} value={this.props.health.current} max={this.props.health.max} />
                </div>
                <div className={style['status-info__bar-block']} data-label="M">
                    <progress className={style['status-info__bar']} value={this.props.mana.current} max={this.props.mana.max} />
                </div>
                <div className={style['status-info__bar-block']} data-label="S">
                    <progress className={style['status-info__bar']} value={this.props.stamina.current} max={this.props.stamina.max} />
                </div>
            </div>
        )
    }

    get elFull() {
        return(
            <div>
                <strong>{this.props.playerName}</strong>
                <div>
                    <ul>
                        <li>{this.props.strength}</li>
                        <li>{this.props.dexterity}</li>
                        <li>{this.props.intelligence}</li>
                        <li>0??</li>
                    </ul>
                    <ul>
                        <li>
                            <span>{this.props.health.current}</span>
                            <span>{this.props.health.max}</span>
                        </li>
                        <li>
                            <span>{this.props.stamina.current}</span>
                            <span>{this.props.stamina.max}</span>
                        </li>
                        <li>
                            <span>{this.props.mana.current}</span>
                            <span>{this.props.mana.max}</span>
                        </li>
                        <li>0/45??</li>
                    </ul>
                    <ul>
                        <li>{this.props.statCap}</li>
                        <li>{this.props.luck}</li>
                        <li>
                            <span>{this.props.weight.current}</span>
                            <span>{this.props.weight.max}</span>
                        </li>
                        <li>0</li>
                    </ul>
                    <ul>
                        <li>{this.props.damage.min} - {this.props.damage.max}</li>
                        <li>0</li>
                        <li>
                            <span>{this.props.followers.current}</span>
                            <span>{this.props.followers.max}</span>
                        </li>
                        <li>0</li>
                    </ul>
                    <ul>
                        <li>0</li>
                        <li>0</li>
                        <li>0</li>
                        <li>0</li>
                    </ul>
                    <ul>
                        <li>
                            <span>{this.props.resist.fire}/70</span>
                            <span>{this.props.resist.cold}/70</span>
                            <span>{this.props.resist.poison}/70</span>
                            <span>{this.props.resist.energy}/70</span>
                        </li>
                        <li>{this.props.gold}</li>
                    </ul>
                </div>
                <div onClick={this.onToggleMinimize}>minimize</div>
            </div>
        )
    }

    get content() {
        if(this.state.minimize) {
            return this.elShort
        } else {
            return this.elFull
        }
    }

    render() {
        return(
            <div>
                {this.content}
            </div>
        )
    }

}

export { StatusInfo as default, style, actions, reducer }
