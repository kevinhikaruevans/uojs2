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
import ServerList from 'component/server-list'
import CharacterList from 'component/character-list'

import style from './style'

@connect(store => ({
    connectStatus       : store.connect.status,
    serverListStatus    : store.serverList.status,
    characterListStatus : store.characterList.status
}))
class Application extends Component {

    static propTypes = {
        connectStatus   : PropTypes.bool,
        serverListStatus: PropTypes.bool
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
        if(this.props.connectStatus) {
            if(this.props.characterListStatus) {
                return <CharacterList />
            }
            else if(this.props.serverListStatus) {
                return <ServerList />
            }
        } else {
            return <Login />
        }

        // return <PostLoginComponent {...this.props}/>;
        // }
        // return <World handlers={this.props.handlers}/>;
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

export default Application;
