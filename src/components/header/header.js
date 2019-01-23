import React, { Component } from 'react';
import background from "../captivePortal/optionsSidebar/tabs/styleComponents/background";
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            popup: false,
            auth: true
        };
        this.openClose = this.openClose.bind(this);
        this.popup = this.popup.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    openClose(){
        this.props.sidebarStatus();
    }

    popup(){
        this.setState({
            popup: !this.state.popup
        });
    }

    logOut(){
        this.props.setToken('');
        localStorage.removeItem('token');
        this.setState({
            auth: false
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.auth !== nextState.auth){
            return true
        } else if(this.state.popup !== nextState.popup){
            return true
        } else {
            return false
        }
    }

    render(){
        return(
            <header>
                <div className="container">
                    <div className="wrap">
                        <div className="left">
                            <a href="javascript:void(0)"
                               onClick={this.openClose}
                               className="menu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g fill="#BFC5D2" fillRule="nonzero">
                                        <path d="M19 11H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1zM19 5H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1zM19 17H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                                    </g>
                                </svg>
                            </a>
                            <div className="logoPlace">
                                <img src={require('../../static/images/logo.png')} alt=""/>
                            </div>
                        </div>
                        <div className="right">
                            <a href="javascript:void(0)">Help</a>
                            <div className="user">
                                <div className="avatar">
                                    <img src={require('../../static/images/oval.png')} alt=""/>
                                </div>
                                <a href="javascript:void(0)"
                                   className="caret"
                                   onClick={this.popup}>
                                    <span>{localStorage.getItem('email')}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                    </svg>
                                </a>
                                <div className={this.state.popup ? "popup active" : 'popup'}>
                                    <ul>
                                        <li><button onClick={this.logOut} type="button">Log out</button></li>
                                    </ul>
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

export default connect(
    state => ({
        token: state.token
    }),
    dispatch=>({
        setToken:(string) => {
            dispatch({type: "TOKEN", payload: string})
        }
    })
)(Header);
