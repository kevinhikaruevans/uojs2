import { Component, PropTypes } from 'react';

export default class LoginComponent
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
        return <div>Login schtuff</div>
    }
}
