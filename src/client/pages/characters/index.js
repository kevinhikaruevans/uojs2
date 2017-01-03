import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Character from 'component/character'

import style from './style'

@connect((store) => ({
    list : store.character.list
}))
class Characters extends Component {

    static displayName = '[page] characters';

    static defaultProps = {
        list : []
    };

    static propTypes = {
        list : PropTypes.array
    };

    render() {
        return(
            <div className={style['page-characters']}>
                {this.props.list.map(({ name, password }, index) => {
                    const props = {
                        key : index,
                        index,
                        name,
                        password
                    };

                    return <Character {...props} />
                })}
            </div>
        )
    }

}

export { Characters as default, style }
