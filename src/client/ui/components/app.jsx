import React, { Component, PropTypes } from 'react';

export default class AppComponent
    extends Component
{
    static propTypes = {

    }
    state = {
        username: '',
        password: ''
    }
    constructor(props) {
        super(props);
    }
    render() {
        return <div>App schtuff</div>
    }
}
