import React, {Component} from 'react';
import Background from "./styleComponents/background";
import Logo from "./styleComponents/logo";
import Container from "./styleComponents/container/container";

class StyleTab extends Component {
    constructor(props){
        super(props);
        this.state={
            event: '',
            visible: 'Background',
        };
        this.Background = React.createRef();
    }

    componentDidMount(){
        this.setState({
            event: this.Background.current
        });
    }

    componentDidUpdate(){
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

    render(){
        return(
            <div className="dropdown">
                <div className="wrap">
                    <div
                        className="head"
                        data-cy="backgroundDropDown"
                        onClick={this.dropDownHandler}
                        ref={this.Background}>
                        <span>Background</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Background' ?
                        <Background type="background"/> :
                        false}
                </div>
                <div className="wrap">
                    <div className="head"
                         data-cy="logoDropDown"
                         onClick={this.dropDownHandler}>
                        <span>Logo</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Logo' ?
                        <Logo type="logo"/>:
                        false}
                </div>
                <div className="wrap">
                    <div
                        className="head"
                        data-cy="containerDropDown"
                        onClick={this.dropDownHandler}>
                        <span>Container</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Container' ?
                        <Container /> :
                        false}
                </div>
            </div>
        )
    }
}

export default StyleTab;
