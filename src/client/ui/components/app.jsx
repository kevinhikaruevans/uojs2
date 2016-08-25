import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginComponent from './login';

import * as loginActionCreators from '../../state/login/actions';

export class AppComponent
    extends Component
{
    static propTypes = {

    }

    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.login.user.loggedIn) {
            return <LoginComponent />;
        }
        return <div>App schtuff</div>
    }
}

export default connect(
    store => ({login: store.login}),
    dispatch => ({actions: bindActionCreators(loginActionCreators, dispatch)})
)(AppComponent);
