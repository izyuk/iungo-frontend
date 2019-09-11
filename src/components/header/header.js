import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';

class Header extends Component {

    static contextType = CaptivePortalContext;


    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            auth: true,
            // path: ''
        };
        this.openClose = this.openClose.bind(this);
        this.popup = this.popup.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    openClose() {
        this.props.sidebarStatus();
    }

    popup() {
        this.setState({
            popup: !this.state.popup
        });
    }

    logOut() {
        this.context.setToken('');
        localStorage.removeItem('token');
        this.setState({
            auth: false
        })
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.auth !== nextState.auth) {
            return true
        } else if (this.state.popup !== nextState.popup) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <header>
                <div className="container">
                    <div className="wrap">
                        <div className="left">
                            <a href="javascript:void(0)"
                               onClick={this.openClose}
                               className="menu">
                                <Icons.MenuIcon/>
                            </a>
                            <div className="logoPlace">
                                <img src={require('~/static/images/logo.png')} alt=""/>
                            </div>
                        </div>
                        <div className="right">
                            <a href="https://bravofy.com/support/" target="_blank">Help</a>
                            <div className="user">
                                <div className="avatar">
                                    <Icons.AvatarIcon/>
                                </div>
                                <a href="javascript:void(0)"
                                   className="caret"
                                   onClick={this.popup}>
                                    <span>{localStorage.getItem('email')}</span>
                                    <Icons.DropdownIcon/>
                                </a>
                                <div className={this.state.popup ? "popup active" : 'popup'}>
                                    <ul className={'zi'}>
                                        <li onClick={() => {this.state.popup && this.setState({popup: false})}}><Link to={'/settings/profile'}>Settings</Link></li>
                                        <li>
                                            <button onClick={this.logOut} type="button">Log out</button>
                                        </li>
                                    </ul>
                                    <div onClick={this.popup} className={'backgroundCover'}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !this.state.auth ?
                        <Redirect to=''/>
                        : false
                }
            </header>
        )
    }
}

export default Header