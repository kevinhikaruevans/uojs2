import React, { Component } from 'react';

import DevtoolsMap from 'component/devtools-map'
import DevtoolsCursore from 'component/devtools-cursore'

import style from './style'

class Devtools extends Component {

    static displayName = '[component] devtools';

    state = {
        x       : localStorage.getItem('devtools-x') === 'true',
        y       : localStorage.getItem('devtools-y') === 'true',
        sidebar : false,
        tool    : null
    };

    onClickChangePosition = (axis, value) => {
        return e => {
            e.preventDefault();

            this.setState({
                [axis] : value
            }, () => {
                localStorage.setItem(`devtools-${axis}`, value);
            })
        }
    };

    onClickSidebar = e => {
        e.preventDefault();

        this.setState({
            sidebar : !this.state.sidebar
        })
    };

    onClickSelectTool = tool => {
        return e => {
            e.preventDefault();

            if(this.state.tool === tool) {
                this.setState({
                    tool : null
                })
            } else {
                this.setState({ tool })
            }
        }
    };

    get elPositionTop() {
        if(!this.state.sidebar && !this.state.y) {
            return(
                <svg className={`${style['devtools__position']} ${style['devtools__position_top']}`} onClick={this.onClickChangePosition('y', true)} viewBox="0 0 512 512">
                    <path d="m495 236l-233-233c-4-4-11-4-15 0l-233 233c-4 4-4 11 0 15l73 74c4 4 11 4 15 0l90-81l0 257c0 6 5 11 11 11l106 0c6 0 11-5 11-11l0-257l87 81c4 4 10 4 14 0l74-74c2-2 3-4 3-7c0-3-1-6-3-8z m-81 66l-97-91c-3-3-8-3-12-2c-4 2-6 6-6 10l0 272l-86 0l0-271c0-5-2-8-6-10c-4-2-8-1-12 2l-100 91l-59-59l218-218l218 218z" />
                </svg>
            )
        }
    }

    get elPositionRight() {
        if(!this.state.sidebar && !this.state.x) {
            return(
                <svg className={`${style['devtools__position']} ${style['devtools__position_right']}`} onClick={this.onClickChangePosition('x', true)} viewBox="0 0 512 512">
                    <path d="m509 248l-233-233c-4-4-11-4-15 0l-74 74c-4 4-4 11 0 15l82 88l-258 0c0 0 0 0 0 0c-3 0-6 1-8 3c-2 2-3 5-3 8l0 107c0 6 5 11 11 11l257 0l-81 87c-4 4-4 11 0 15l74 74c2 2 5 3 7 3c3 0 6-1 8-3l233-233c4-5 4-11 0-16z m-241 226l-58-59l91-98c3-3 3-7 2-11c-2-4-6-6-10-6l-272 0l0-87l273 1l0 0c4 0 8-3 10-7c1-4 1-8-2-11l-92-99l58-59l218 218z" />
                </svg>
            )
        }
    }

    get elPositionBottom() {
        if(!this.state.sidebar && this.state.y) {
            return(
                <svg className={`${style['devtools__position']} ${style['devtools__position_bottom']}`} onClick={this.onClickChangePosition('y', false)} viewBox="0 0 512 512">
                    <path d="m497 261l-74-74c-4-4-11-4-15 0l-87 81l0-257c0-6-5-11-11-11l-107 0c-6 0-10 5-10 11l0 258l-89-82c-4-4-11-4-15 0l-74 74c-4 4-4 11 0 15l233 233c2 2 5 3 8 3c3 0 6-1 8-3l233-233c4-4 4-11 0-15z m-241 225l-218-218l59-59l99 92c3 3 8 3 12 2c3-2 6-6 6-10l0-272l85 0l0 271c0 5 3 9 7 10c4 2 8 1 11-2l98-90l59 58z" />
                </svg>
            )
        }
    }

    get elPositionLeft() {
        if(!this.state.sidebar && this.state.x) {
            return(
                <svg className={`${style['devtools__position']} ${style['devtools__position_left']}`} onClick={this.onClickChangePosition('x', false)} viewBox="0 0 512 512">
                    <path d="m509 195c-2-2-4-3-7-3l-260 0l83-88c4-4 4-11 0-15l-74-74c-4-4-11-4-15 0l-233 233c-4 5-4 11 0 16l233 233c2 2 5 3 7 3c3 0 6-1 8-3l74-74c4-4 4-11 0-15l-82-87l258 0c6 0 11-5 11-11l0-107c0-3-1-5-3-8z m-19 105l-271 0c-4 0-8 2-10 6c-2 4-1 9 2 12l91 97l-59 59l-218-218l218-218l59 59l-92 99c-3 3-4 7-2 11c2 4 6 7 10 7l273 0z" />
                </svg>
            )
        }
    }

    elSidebarItem = (label, code) => {
        return <li className={style['devtools__sidebar-item']} onClick={this.onClickSelectTool(code)} data-active={this.state.tool === code}>{label}</li>
    };

    get elSidebar() {
        if(this.state.sidebar) {
            return(
                <ul className={style['devtools__sidebar']}>
                    {this.elSidebarItem('Cursore corrector', 'cursore')}
                    {this.elSidebarItem('Map', 'map')}
                </ul>
            )
        }
    }

    get elTool() {
        switch(this.state.tool) {
            case 'map':
                return <DevtoolsMap />;
                break;
            case 'cursore':
                return <DevtoolsCursore />
                break;
        }
    }

    get elToolContainer() {
        if(this.state.sidebar && this.state.tool) {
            return <div className={style['devtools__tool']}>{this.elTool}</div>
        }
    }

    render() {
        return(
            <div className={style['devtools']} data-x={this.state.x} data-y={this.state.y}>
                {this.elSidebar}
                <div className={style['devtools__toggle']} data-status={this.state.sidebar}>
                    <svg className={style['devtools__button']} onClick={this.onClickSidebar} viewBox="0 0 512 512">
                        <path d="m501 299l-43 0c-1-22-6-43-13-62l39-18c6-2 8-8 6-14-3-5-9-8-14-5l-40 17c-3-6-6-12-10-18-1-1-2-3-3-4-19-27-44-50-73-65 12-13 21-28 27-45 22-2 39-20 39-42 0-24-19-43-43-43-23 0-42 19-42 43 0 17 10 31 24 38-6 15-15 28-26 39-23-8-47-13-73-13-26 0-50 5-73 13-11-11-20-24-26-39 14-7 24-21 24-38 0-24-19-43-42-43-24 0-43 19-43 43 0 22 17 40 39 42 6 17 15 32 27 45-29 15-54 38-73 65-1 1-2 3-3 4-4 6-7 12-10 18l-40-17c-5-3-11 0-14 5-2 6 0 12 6 14l39 18c-7 19-12 40-13 62l-43 0c-6 0-11 4-11 10 0 6 5 11 11 11l43 0c1 24 6 47 15 68l-38 19c-5 3-8 9-5 15 2 3 6 6 10 6 1 0 3-1 4-2l39-18c35 62 101 104 177 104 76 0 142-42 177-104l39 18c1 1 3 2 4 2 4 0 8-3 10-6 3-6 0-12-5-15l-38-19c9-21 14-44 15-68l43 0c6 0 11-5 11-11 0-6-5-10-11-10z m-128-278c12 0 22 10 22 22 0 11-10 21-22 21-11 0-21-10-21-21 0-12 10-22 21-22z m-256 22c0-12 10-22 22-22 11 0 21 10 21 22 0 11-10 21-21 21-12 0-22-10-22-21z m139 85c55 0 105 25 138 64l-276 0c33-39 83-64 138-64z m-181 181c0-35 10-68 27-96l143 0 0 277c-95-5-170-84-170-181z m192 181l0-277 143 0c17 28 27 61 27 96 0 97-75 176-170 181z" />
                    </svg>
                    {this.elPositionTop}
                    {this.elPositionRight}
                    {this.elPositionBottom}
                    {this.elPositionLeft}
                </div>
                {this.elToolContainer}
            </div>
        )
    }
}

export { Devtools as default, style };
