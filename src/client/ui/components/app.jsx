import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginComponent from './login';
import PostLoginComponent from './postlogin';
import World from './world';
import MainScene from './scene';

import * as loginActionCreators from '../../state/login/actions';

import Intro from 'component/intro'

class AppComponent
    extends Component
{
    static propTypes = {
        handlers: PropTypes.object.isRequired
    };

    state = {
        intro : !!localStorage.getItem('intro')
    };

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
            return <LoginComponent {...this.props}/>;
        }
        if (this.props.login.user.chosenCharacterIndex === null) {
            return <PostLoginComponent {...this.props}/>;
        }
        return <World handlers={this.props.handlers}/>;
    }

    render() {
        return(
            <div>
                {this.elIntro}
                {this.content}
            </div>
        )
    }
}

export default connect(
    store => ({login: store.login})
    //dispatch => ({actions: bindActionCreators(loginActionCreators, dispatch)})
)(AppComponent);
