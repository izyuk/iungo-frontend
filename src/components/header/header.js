import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import CaptivePortalContext from "../../context/project-context";

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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="#BFC5D2" fillRule="nonzero">
                                        <path
                                            d="M19 11H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1zM19 5H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1zM19 17H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                                    </g>
                                </svg>
                            </a>
                            <div className="logoPlace">
                                <img src={require('../../static/images/logo.png')} alt=""/>
                            </div>
                        </div>
                        <div className="right">
                            <a href="https://bravofy.com/support/" target="_blank">Help</a>
                            <div className="user">
                                <div className="avatar">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="53" height="67" viewBox="0 0 53 67">
                                        <g fill="none" fillRule="evenodd">
                                            <path fill="#5282F0"
                                                  d="M53 67v-5.675C53 46.847 41.075 35 26.5 35S0 46.847 0 61.325V67h53z"/>
                                            <path fill="#FFF" d="M18 42V30l12 6z"/>
                                            <path fill="#FFF" d="M37 42V30l-12 6z"/>
                                            <path fill="#BFC5D3"
                                                  d="M44 17c0 9.389-7.611 17-17 17s-17-7.611-17-17S17.611 0 27 0s17 7.611 17 17"/>
                                            <path fill="#082265"
                                                  d="M10 14.393a22.03 22.03 0 0 0 5.131.607C24.06 15 31.721 9.684 35 2.106A17.087 17.087 0 0 0 26.754 0C18.17 0 11.086 6.272 10 14.393"/>
                                            <path fill="#BFC5D3"
                                                  d="M46 22a4 4 0 1 1-8 0 4 4 0 0 1 8 0M16 22a4 4 0 1 1-8 0 4 4 0 0 1 8 0"/>
                                            <path stroke="#FFF" strokeWidth=".75" d="M42 60H31V49h11zM31 53h11"/>
                                            <path fill="#082265"
                                                  d="M24 .34C25.071 8.059 31.64 14 39.59 14c1.53 0 3.01-.225 4.41-.636C42.275 5.713 35.493 0 27.384 0c-1.159 0-2.29.118-3.384.34"/>
                                        </g>
                                    </svg>

                                </div>
                                <a href="javascript:void(0)"
                                   className="caret"
                                   onClick={this.popup}>
                                    <span>{localStorage.getItem('email')}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#BFC5D2" fillRule="nonzero"
                                              d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                    </svg>
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