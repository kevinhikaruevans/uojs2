import React, { Component, PropTypes } from 'react';

export default class WorldComponent
    extends Component
{
    static propTypes = {
        handlers: PropTypes.object.isRequired
    }
    state = {
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                todo :l
            </div>
        );
    }
}
