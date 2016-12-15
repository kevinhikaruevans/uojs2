import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginComponent from './../../ui/components/login';
import PostLoginComponent from './../../ui/components/postlogin';
import World from './../../ui/components/world';
// import MainScene from './scene';

import * as loginActionCreators from '../../state/login/actions';
import * as networkActionCreators from '../../state/network/actions';

import Intro from 'component/intro'
import Login from 'component/login'

import { Packet } from './../../network/packet'

import style from './style'

class Application extends Component {

    static propTypes = {
        handlers    : PropTypes.object.isRequired,
        transport   : PropTypes.object.isRequired
    };

    static childContextTypes = {
        transport: PropTypes.object
    };

    state = {
        intro : !!localStorage.getItem('intro')
    };

    getChildContext() {
        return {
            transport : this.props.transport
        }
    }

    get elIntro() {
        if(!this.state.intro) {
            const props = {
                onExit : e => {
                    this.setState({
                        intro : true
                    });

                    localStorage.setItem('intro', true);
                }
            };

            return <Intro {...props} />
        }
    }

    get content() {
        if (this.props.login.user.loggedIn === false) {
            return(
                <div>
                    <Login />
                    <LoginComponent {...this.props} />
                </div>
            );
        }
        if (this.props.login.user.chosenCharacterIndex === null) {
            return <PostLoginComponent {...this.props}/>;
        }
        return <World handlers={this.props.handlers}/>;
    }

    render() {
        return(
            <div className={style['app']}>
                {this.elIntro}
                {this.content}
            </div>
        )
    }
}

export default connect(
        store => ({login: store.login, network: store.network}),
        dispatch => ({
            loginActions: bindActionCreators(loginActionCreators, dispatch),
            networkActions: bindActionCreators(networkActionCreators, dispatch)
        })
)(Application);
