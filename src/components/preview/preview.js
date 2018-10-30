import React, {Component} from 'react';

import style from './preview.less';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changes: true,
            backgrType: 'color',
            logoName: this.props.logo === '' ? 'logo.png' : this.props.logo
        };
        // this.eventHandler = this.eventHandler.bind(this);
    }

    componentDidUpdate(){
        // console.log(this.props.logo);
        // console.log('preview update', this.state.logoName);
        // console.log('../../static/uploads/logo/'+this.props.logo);
    }

    componentDidMount(){
        console.log('preview mount', this.state.logoName);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.state.logoName !== nextState.logoName){
            // console.log('Preview ======================');
            return (this.state.logoName !== nextState.logoName);
        } else if(this.props.logo !== nextProps.logo) {
            // console.log('Preview ======================');
            return (this.props.logo !== nextProps.logo);
        } else {
            return false;
        }
    }

    render() {
        // debugger;
        return (
            <div className={style.previewContainer}>
                <div className={style.header}>
                    <div className={style.logoPlace}>

                        {/*<img src={require(this.props.logo === '' ? `../../static/images/${this.state.logoName}` : `../../static/uploads/logo/${this.state.logoName}`)} alt=""/>*/}
                        {this.props.logo === '' ?
                            <img src={require('../../static/images/logo.png')} alt=""/> :
                            <img src={require('../../static/uploads/logo/'+this.props.logo)} alt=""/>}
                        {/*<img src={require('../../static/images/'+ this.props.logo.logoName === '' ? 'logo.png' : this.props.logo.logoName)} alt=""/>*/}
                    </div>
                </div>
                <div className={style.section}>
                    <div className={style.contentPlace}>
                        <div className={style.socialsWrap}>
                            <div className={style.fb}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path fill="#FFF" fillRule="nonzero"
                                              d="M15.3 0H.7C.3 0 0 .3 0 .7v14.7c0 .3.3.6.7.6H8v-5H6V8h2V6c0-2.1 1.2-3 3-3h2v3h-1c-.6 0-1 .4-1 1v1h2.6l-.6 3h-2v5h4.3c.4 0 .7-.3.7-.7V.7c0-.4-.3-.7-.7-.7z"/>
                                    </svg>
                                </span>
                                <input type="button" value="Continue with Facebook"/></div>
                            <div className={style.google}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                        <path fill="#FFF" fillRule="nonzero"
                                              d="M7 6v2.4h4.1c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C10.6.7 9 0 7.1 0c-3.9 0-7 3.1-7 7s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7z"/>
                                    </svg>
                                </span>
                                <input type="button" value="Continue with Google"/></div>
                            <div className={style.tw}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
                                        <path fill="#FFF" fillRule="nonzero"
                                              d="M16 2c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1C9.3.5 7.8 2 7.8 3.8c0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 6.7 1.8 8 3.3 8.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 3.3 15.6 2.7 16 2z"/>
                                    </svg>

                                </span>
                                <input type="button" value="Continue with Twitter"/></div>
                        </div>
                        <div className={style.inputsWrap}>
                            <div className={style.email}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
                                        <g fill="#8D98B0" fillRule="nonzero">
                                            <path d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
                                            <path
                                                d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
                                        </g>
                                    </svg>
                                </span>
                                <input type="email" placeholder="Continue with Email"/>
                            </div>
                            <div className={style.password}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path fill="#8D98B0" fillRule="nonzero"
                                              d="M15.285 12.305l-2.578-2.594a1 1 0 0 0-1.416-.002L9 12 4 7l2.294-2.294a1 1 0 0 0 .001-1.414L3.715.708a1 1 0 0 0-1.415 0L.004 3.003 0 3c0 7.18 5.82 13 13 13l2.283-2.283a1 1 0 0 0 .002-1.412z"/>
                                    </svg>
                                </span>
                                <input type="password" placeholder="Continue with Phone"/>
                            </div>
                        </div>

                    </div>

                </div>
                <div className={style.footer}>
                    {/*<div className={style.contentPlace}>*/}
                        {/*<h3>Footer Name</h3>*/}
                        {/*<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam, architecto*/}
                            {/*asperiores commodi dolores eos est ex facere id impedit minus nesciunt non odio recusandae*/}
                            {/*sequi tenetur voluptas voluptatem! Eius.</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}

export default Preview;
