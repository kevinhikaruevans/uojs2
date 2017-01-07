import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import actions, { statControl } from './actions'
import reducer from './reducer'

import style from './style'

@connect((state) => ({
    id              : state.statusInfo.serial,
    health          : state.statusInfo.health,
    mana            : state.statusInfo.mana,
    weight          : state.statusInfo.weight,
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
        gold            : PropTypes.number,
        className       : PropTypes.string,
        dispatch        : PropTypes.func,

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
        minimize : localStorage.getItem(`status-info-minimize-${this.props.id}`) === 'true',
        x        : parseInt(localStorage.getItem(`status-info-x-${this.props.id}`), 10) || '50%',
        y        : parseInt(localStorage.getItem(`status-info-y-${this.props.id}`), 10) || '50%'
    };

    onToggleMinimize = (e) => {
        e.preventDefault();

        this.setState({
            minimize : !this.state.minimize
        }, () => {
            localStorage.setItem(`status-info-minimize-${this.props.id}`, this.state.minimize)
        })
    };

    // @TODO: go base class method
    get className() {
        let result = style['status-info'];

        if(this.props.className) {
            result = `${result} ${this.props.className}`;
        }

        return result;
    }

    onMove = (e) => {
        if(this.move) {
            let x = e.clientX;
            let y = e.clientY;

            const offsetWidth = e.currentTarget.offsetWidth / 2;
            const offsetHeight = e.currentTarget.offsetHeight / 2;

            if(e.clientX > offsetWidth) {
                if(x + offsetWidth > window.innerWidth) {
                    x = window.innerWidth - offsetWidth;
                }

                x = x - offsetWidth;
            } else {
                x = 0;
            }

            if(e.clientY > offsetHeight) {
                if(y + offsetHeight > window.innerHeight) {
                    y = window.innerHeight - offsetHeight;
                }

                y = y - offsetHeight;
            } else {
                y = 0;
            }

            this.setState({
                x,
                y
            }, () => {
                localStorage.setItem(`status-info-x-${this.props.id}`, x);
                localStorage.setItem(`status-info-y-${this.props.id}`, y);
            });
        }
    };

    onMoveStart = (e) => {
        e.preventDefault();

        this.move = true;
    };

    onMoveStop = (e) => {
        e.preventDefault();

        this.move = false;
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

    onClickTest = (e) => {
        e.preventDefault();
        console.log(111)

        this.props.dispatch(statControl({
            stat  : 1,
            state : 1
        }))
    };

    get elFull() {
        return(
            <div className={style['status-info__full']}>
                <div className={style['status-info__header']}>
                    <strong className={style['status-info__player-name']}>{this.props.playerName}</strong>
                    <div onClick={this.onToggleMinimize}>minimize</div>
                </div>
                <ul className={style['status-info__list']}>
                    <li className={style['status-info__list-item']} onClick={this.onClickTest}>str: {this.props.strength}</li>
                    <li className={style['status-info__list-item']}>dex: {this.props.dexterity}</li>
                    <li className={style['status-info__list-item']}>int: {this.props.intelligence}</li>
                </ul>
                <ul className={style['status-info__list']}>
                    <li className={`${style['status-info__list-item']} ${style['status-info__list-item_split']}`}>
                        <span className={style['status-info__points']}>{this.props.health.current}</span>
                        <span className={style['status-info__points']}>{this.props.health.max}</span>
                    </li>
                    <li className={`${style['status-info__list-item']} ${style['status-info__list-item_split']}`}>
                        <span className={style['status-info__points']}>{this.props.stamina.current}</span>
                        <span className={style['status-info__points']}>{this.props.stamina.max}</span>
                    </li>
                    <li className={`${style['status-info__list-item']} ${style['status-info__list-item_split']}`}>
                        <span className={style['status-info__points']}>{this.props.mana.current}</span>
                        <span className={style['status-info__points']}>{this.props.mana.max}</span>
                    </li>
                </ul>
                <ul className={style['status-info__list']}>
                    <li className={style['status-info__list-item']}>cap: {this.props.statCap}</li>
                    <li className={style['status-info__list-item']}>lck: {this.props.luck}</li>
                    <li className={`${style['status-info__list-item']} ${style['status-info__list-item_split']}`}>
                        <span className={style['status-info__points']}>{this.props.weight.current}</span>
                        <span className={style['status-info__points']}>{this.props.weight.max}</span>
                    </li>
                </ul>
                <ul className={style['status-info__list']}>
                    <li className={style['status-info__list-item']}>dmg: {this.props.damage.min} - {this.props.damage.max}</li>
                    <li className={`${style['status-info__list-item']} ${style['status-info__list-item_split']}`}>
                        <span className={style['status-info__points']}>{this.props.followers.current}</span>
                        <span className={style['status-info__points']}>{this.props.followers.max}</span>
                    </li>
                </ul>
                <ul className={style['status-info__list']}>
                    <li className={`${style['status-info__list-item']} ${style['status-info__list-item_split']}`}>
                        <span className={style['status-info__points']}>fir: {this.props.resist.fire}/70</span>
                        <span className={style['status-info__points']}>cld: {this.props.resist.cold}/70</span>
                        <span className={style['status-info__points']}>psn: {this.props.resist.poison}/70</span>
                        <span className={style['status-info__points']}>nrg: {this.props.resist.energy}/70</span>
                    </li>
                    <li className={style['status-info__list-item']}>gold: {this.props.gold}</li>
                </ul>
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
        const props = {
            className    : this.className,
            onMouseMove  : this.onMove,
            onMouseDown  : this.onMoveStart,
            onMouseUp    : this.onMoveStop,
            onMouseLeave : this.onMoveStop,
            style        : {
                top  : this.state.y,
                left : this.state.x
            }
        };

        return(
            <div {...props}>
                {this.content}
            </div>
        )
    }

}

export { StatusInfo as default, style, actions, reducer }
