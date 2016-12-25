import React, { Component, PropTypes } from 'react'

import CharacterList from 'component/character-list'

import style from './style'

class Characters extends Component {

    static displayName = '[page] characters';

    render() {
        return(
            <div>
                <CharacterList />
            </div>
        )
    }

}

export { Characters as default, style }
