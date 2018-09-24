import React, {Component} from 'react';
import Background from './background';
import LogoImage from './logo-image';
import style from './builder.less';

class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            visible: 'Background'
        };
        this.Background = React.createRef();
        this.LogoImage = React.createRef();
        this.tabHandler = this.tabHandler.bind(this);
    }

    tabHandler(e) {
        console.log(document.getElementsByClassName(`${style.container}`).length);
        for(let i = 0; i < document.getElementsByClassName(`${style.container}`).length; i++){
            document.getElementsByClassName(`${style.container}`)[i].classList.remove(style.active);
        }
        e.target.closest(`.${style.head}`).nextSibling.classList.add(style.active)
    }


    render() {
        return (
            <div className={style.options}>
                <p className="name">Builder</p>
                <div className={style.wrap}>
                    <ul className={style.buttonsWrap}>
                        <li className={style.active}>Style</li>
                        <li>Content</li>
                        <li>Settings</li>
                    </ul>
                    <div className={style.dropdown}>
                        <div className="wrap">
                            <div className={style.head} onClick={this.tabHandler}>
                                <span>Background</span>
                            </div>
                            <Background style={style} ref={this.Background}/>
                        </div>
                        <div className="wrap">
                            <div className={style.head} onClick={this.tabHandler}>
                                <span>Logo Image</span>
                            </div>
                            <LogoImage style={style} ref={this.LogoImage}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // componentDidMount() {
    //     this.inputRef.current.focus();
    // }
}

export default Options;
