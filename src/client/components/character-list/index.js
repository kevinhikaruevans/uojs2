import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CharacterSelect from 'component/character-select';

import actions from './actions'
import reducer from './reducer'

@connect(store => ({
    list : store.characterList.list
}))
class CharacterList extends Component {

    static displayName = '[component] character-list';

    static propTypes = {
        list : PropTypes.array.isRequired
    };

    render() {
        return(
            <div>
                <ul>
                    {this.props.list.map(({ name, password }, index) => {
                        const props = {
                            key : index,
                            name,
                            password
                        };

                        return <CharacterSelect {...props} />
                    })}
                </ul>
                <div>Add char</div>
                <div>delete</div>
            </div>
        )
    }

}

export { CharacterList as default, actions, reducer }
