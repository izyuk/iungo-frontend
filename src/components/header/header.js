import React, { Component } from 'react';

import style from './header.less';
import background from "../builder/background";

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            popup: false
        };
        this.openClose = this.openClose.bind(this);
        this.popup = this.popup.bind(this);
    }

    openClose(){
        this.props.sidebarStatus();
    }

    popup(){
        this.setState({
            popup: !this.state.popup
        });
    }

    render(){
        return(
            <header>
                <div className={style.container}>
                    <div className={style.wrap}>
                        <div className={style.left}>
                            <a href="javascript:void(0)"
                               onClick={this.openClose}
                               className={style.menu}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="#BFC5D2" fillRule="nonzero">
                                        <path d="M19 11H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1zM19 5H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1zM19 17H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                                    </g>
                                </svg>
                            </a>
                            <div className={style.logoPlace}>
                                <img src={require('../../static/images/logo.png')} alt=""/>
                            </div>
                        </div>
                        <div className={style.right}>
                            <a href="javascript:void(0)">Help</a>
                            <div className={style.user}>
                                <div className={style.avatar}>
                                    <img src={require('../../static/images/oval.png')} alt=""/>
                                </div>
                                <a href="javascript:void(0)"
                                   className={style.caret}
                                   onClick={this.popup}>
                                    <span>Steve Banks</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                    </svg>
                                </a>
                                <div className={[style.popup, this.state.popup ? style.active : ''].join(' ')}>
                                    <ul>
                                        <li><a href="javascript:void(0)">Profile</a></li>
                                        <li><a href="javascript:void(0)">Pricing</a></li>
                                        <li><a href="javascript:void(0)">Log out</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;
