import React, {Component} from 'react';
import style from "../options.less";
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
        this.state.event.closest(`.${style.head}`).classList.add(style.active);
        this.state.event.closest(`.${style.head}`).nextSibling.classList.add(style.active);
    }

    dropDownHandler = (e) => {
        this.setState({
            event: e.currentTarget
        });
        for (let i = 0; i < document.querySelectorAll(`.${style.head}`).length; i++) {
            document.querySelectorAll(`.${style.head}`)[i].classList.remove(style.active);
        }
        this.setState({
            visible: e.currentTarget.childNodes[0].innerHTML
        });
    };

    render(){
        return(
            <div className={style.dropdown}>
                <div className="wrap">
                    <div
                        className={style.head}
                        onClick={this.dropDownHandler}
                        ref={this.Background}>
                        <span>Background</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Background' ?
                        <Background type="background"
                                    style={style}
                                    handler={this.props.handler}/> :
                        false}
                </div>
                <div className="wrap">
                    <div className={style.head}
                         onClick={this.dropDownHandler}>
                        <span>Logo</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Logo' ?
                        <Logo type="logo"
                              style={style}
                              handler={this.props.handler}
                              alignment={this.props.alignment}/>:
                        false}
                </div>
                <div className="wrap">
                    <div
                        className={style.head}
                        onClick={this.dropDownHandler}>
                        <span>Container</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'Container' ?
                        <Container style={style}
                                   handler={this.props.containerHandler}/> :
                        false}
                </div>
            </div>
        )
    }
}

export default StyleTab;
