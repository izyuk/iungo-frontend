import React, {Component} from 'react';
import HeaderText from './contentComponents/headerText/headertText';
import LoginMethods from './contentComponents/loginMethods/loginMethods';
import SuccessActions from './contentComponents/successMessage/successMessage';
import FooterEditor from './contentComponents/footerEditor/footerEditor'

class ContentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            visible: 'Header',
        };
        this.Header = React.createRef();
    }

    componentDidMount() {
        this.setState({
            event: this.Header.current
        });
    }

    componentDidUpdate() {
        this.state.event.closest(".head").classList.add("active");
        this.state.event.closest(".head").nextSibling.classList.add("active");
    }

    dropDownHandler = (e) => {
        this.setState({
            event: e.currentTarget
        });
        for (let i = 0; i < document.querySelectorAll(".head").length; i++) {
            document.querySelectorAll(".head")[i].classList.remove("active");
        }
        this.setState({
            visible: e.currentTarget.childNodes[0].innerHTML
        });
    };

    render() {
        return (
            <div className="dropdown">
                <div className="wrap">
                    <div
                        className="head"
                        data-cy="dropDownHeader"
                        onClick={this.dropDownHandler}
                        ref={this.Header}>
                        <span>Header</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Header' ?
                        <HeaderText /> :
                        false}
                </div>
                <div className="wrap">
                    <div className="head"
                         data-cy="dropDownLoginMethods"
                         onClick={this.dropDownHandler}>
                        <span>Login Methods</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Login Methods' ?
                        <LoginMethods handler={this.props.handler}
                                      methods={this.props.methods}
                                      acceptButton={this.props.acceptButton}
                        /> :
                        false}
                </div>
                <div className="wrap">
                    <div
                        className="head"
                        data-cy="dropDownFooter"
                        onClick={this.dropDownHandler}>
                        <span>Footer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Footer' ?
                        <FooterEditor /> :
                        false}
                </div>
                <div className="wrap">
                    <div
                        className="head"
                        data-cy="dropDownSuccessActions"
                        onClick={this.dropDownHandler}>
                        <span>Success Actions</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Success Actions' ?
                        <SuccessActions /> :
                        false}
                </div>
            </div>
        )
    }
}

export default ContentTab;
