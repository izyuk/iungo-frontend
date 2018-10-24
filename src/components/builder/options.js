import React, {Component} from 'react';
import Background from './background';
import LogoImage from './logo-image';
import Container from './container';
import style from './builder.less';
import {upload_file} from "../../reducers/file_upload";

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            visible: 'Background',
            event: ''
        };
        this.Background = React.createRef();
        this.tabHandler = this.tabHandler.bind(this);
    }

    tabHandler(e) {
        this.setState({
            event: e.target
        });
        for (let i = 0; i < document.getElementsByClassName(`${style.container}`).length; i++) {
            document.getElementsByClassName(`${style.container}`)[i].classList.remove(style.active);
        }
        this.setState({
            visible: e.target.childNodes[0].innerHTML.trim()
        });

    }

    componentDidUpdate(){
        this.state.event.closest(`.${style.head}`).nextSibling.classList.add(style.active);
    }

    componentDidMount(){
        this.setState({
            event: this.Background.current
        });
    }

    render() {
        return (
            <div className={style.options}>
                <div className={style.wrap}>
                    <ul className={style.buttonsWrap}>
                        <li className={style.active}>Style</li>
                        <li>Content</li>
                        <li>Settings</li>
                    </ul>
                    <div className={style.dropdown}>
                        <div className="wrap">
                            <div
                                className={style.head}
                                onClick={this.tabHandler}
                                ref={this.Background}>
                                <span>Background</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>
                            </div>
                            {this.state.visible === 'Background' ?
                                <Background check={() => {this.activeChecker(this)}}
                                            type="background"
                                            style={style}/> :
                                false}
                        </div>
                        <div className="wrap">
                            <div className={style.head}
                                 onClick={this.tabHandler}>
                                <span>Logo Image</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>
                            </div>
                            {this.state.visible === 'Logo Image' ?
                                <LogoImage type="logo"
                                           style={style}/>:
                                false}
                        </div>
                        <div className="wrap">
                            <div
                                className={style.head}
                                onClick={this.tabHandler}>
                                <span>Container</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#BFC5D2" fillRule="nonzero" d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                </svg>
                            </div>
                            {this.state.visible === 'Container' ?
                                <Container style={style}/> :
                                false}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Options;
