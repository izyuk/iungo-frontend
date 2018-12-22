import React, {Component} from 'react';
import style from "../options.less";
import CSS from './settingsComponents/css';
// import LoginMethods from './contentComponents/loginMethods/loginMethods';
// import FooterEditor from './contentComponents/footerEditor/footerEditor'

class SettingsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            visible: 'CSS',
        };
        this.CSS = React.createRef();
        this.dropDownHandler = this.dropDownHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            event: this.CSS.current
        });
    }

    componentDidUpdate() {
        this.state.event.closest(`.${style.head}`).classList.add(style.active);
        this.state.event.closest(`.${style.head}`).nextSibling.classList.add(style.active);
    }

    dropDownHandler(e) {
        this.setState({
            event: e.currentTarget
        });
        for (let i = 0; i < document.querySelectorAll(`.${style.head}`).length; i++) {
            document.querySelectorAll(`.${style.head}`)[i].classList.remove(style.active);
        }
        this.setState({
            visible: e.currentTarget.childNodes[0].innerHTML
        });
    }

    render() {
        return (
            <div className={style.dropdown}>
                <div className="wrap">
                    <div
                        className={style.head}
                        onClick={this.dropDownHandler}
                        ref={this.CSS}>
                        <span>CSS</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'CSS' ?
                        <CSS style={style}/> :
                        false}
                </div>
                {/*<div className="wrap">*/}
                    {/*<div className={style.head}*/}
                         {/*onClick={this.dropDownHandler}>*/}
                        {/*<span>Login Methods</span>*/}
                        {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">*/}
                            {/*<path fill="#BFC5D2" fillRule="nonzero"*/}
                                  {/*d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>*/}
                        {/*</svg>*/}
                    {/*</div>*/}
                    {/*{this.state.visible === 'Login Methods' ?*/}
                        {/*<LoginMethods style={style}*/}
                                      {/*handler={this.props.handler}*/}
                                      {/*methods={this.props.methods}*/}
                        {/*/> :*/}
                        {/*false}*/}
                {/*</div>*/}
                {/*<div className="wrap">*/}
                    {/*<div*/}
                        {/*className={style.head}*/}
                        {/*onClick={this.dropDownHandler}>*/}
                        {/*<span>Footer</span>*/}
                        {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">*/}
                            {/*<path fill="#BFC5D2" fillRule="nonzero"*/}
                                  {/*d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>*/}
                        {/*</svg>*/}
                    {/*</div>*/}
                    {/*{this.state.visible === 'Footer' ?*/}
                        {/*<FooterEditor style={style}*/}
                                      {/*handler={this.props.handler}*/}
                                      {/*footerTextData={this.props.footerTextData}*/}
                        {/*/> :*/}
                        {/*false}*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default SettingsTab;
