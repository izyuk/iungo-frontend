import React, {Component} from 'react';

import style from './preview.less';
import style2 from '../captive-portal.less';

import Methods from './methods';


class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changes: true,
            backgrType: 'color',
            backgroundColor: this.props.state.logoName.colorHEX,
            logoName: this.props.state.logoName === '' ? 'logo.png' : this.props.state.logoName
        };
        this.PreviewMain = React.createRef();
        this.ContainerMain = React.createRef();
        // this.eventHandler = this.eventHandler.bind(this);
    }

    componentDidUpdate() {
        if (this.props.state.backgroundType === 'image') {
            if (this.props.state.type === 'background') {
                if (this.props.state.backgrName !== '' || this.props.state.backgrName !== undefined) {
                    this.PreviewMain.current.style.background = `url(http://${this.props.state.backgrName.url})`;
                } else {
                    console.warn('backgrName is EMPTY or UNDEFINED');
                    this.PreviewMain.current.style.background = this.state.backgroundColor;
                }
            } else if (this.props.state.type === 'logo') {
                this.PreviewMain.current.style.background = this.state.backgroundColor;
            }
        } else if (this.props.state.backgroundType === 'color') {
            if (this.props.state.backgrName !== '') {
                this.PreviewMain.current.style.background = this.props.state.backgrName;
            } else {
                console.warn('NO color');
                this.PreviewMain.current.style.background = this.state.backgroundColor;
            }
        } else {
            console.warn('NO image');
            this.PreviewMain.current.style.background = '#f9f9fc';
        }

        const container = ({border: {color, ...rest}, background, size: {width, padding}}) => {
            console.log(width);
            console.log(padding);

            this.ContainerMain.current.style.borderWidth = rest.thickness ? `${rest.thickness}px` : false;
            this.ContainerMain.current.style.borderStyle = rest.type ? `${rest.type}` : false;
            this.ContainerMain.current.style.borderColor = color ? `rgba(${color.r},${color.g},${color.b},${color.a})` : false;
            this.ContainerMain.current.style.borderRadius = rest.radius ? `${rest.radius}px` : false;
            this.ContainerMain.current.style.background = background.color ? `rgba(${background.color.r},${background.color.g},${background.color.b},${background.color.a})` : false;
            this.ContainerMain.current.style.opacity = background.opacity ? background.opacity / 100 : false;
            this.ContainerMain.current.style.maxWidth = `${width}px`;
            this.ContainerMain.current.style.padding = `${padding}px`;
        };

        container(this.props.state.container);


    }

    componentDidMount() {
        // console.log('preview mount', this.state.logoName);
        // console.log(this.props.logo);
        // console.log(this.props.logo.replace('src', '..'));
        // this.PreviewMain.current.style.background  = `url(${require(image123)})`;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.logoName !== nextState.logoName) {
            return true;
        } else if (this.state.backgroundColor !== nextState.backgroundColor) {
            return true;
        } else if (this.props.state.logoName !== nextProps.state.logoName) {
            return true;
        } else if (this.props.state.backgrName !== nextProps.state.backgrName) {
            return true;
        } else if (this.props.state.backgroundType !== nextProps.state.backgroundType) {
            return true;
        } else if (this.props.state.type !== nextProps.state.type) {
            return true;
        } else if (this.props.state.alignment !== nextProps.state.alignment) {
            return true;
        } else if (this.props.state.mobile !== nextProps.state.mobile) {
            return true;
        } else if (this.props.state.container !== nextProps.state.container) {
            return true;
        } else if (this.props.state.headerText !== nextProps.state.headerText) {
            return true;
        } else if (this.props.state.methods !== nextProps.state.methods) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        let descriptionData = this.props.textDescriptionData;
        let topData = this.props.textTopData;
        let {methods} = this.props.state;
        return (
            <div className={style2.previewWrap}>
                <div className={[style2.previewMain, this.props.state.mobile ? style2.mobile : ''].join(' ')}
                     ref={this.PreviewMain}>
                    <div className={style.previewContainer}>
                        <div className={style.header}>
                            <div className={style.logoPlace} style={{justifyContent: this.props.state.alignment}}>
                                {this.props.state.logoName === '' ?
                                    <img src={require('../../../static/images/logo.png')} alt=""/> :
                                    <img src={`http://${this.props.state.logoName.url}`} alt=""/>}
                            </div>
                        </div>
                        <div className={style.section}
                             ref={this.ContainerMain}>
                            <div className={style.contentPlace}>
                                <div className={style.textPlace}>
                                    <p className={style.head}
                                       style={{
                                           color: `rgba(${topData && topData.color.r}, ${topData && topData.color.g}, ${topData && topData.color.b}, ${topData && topData.color.a})`,
                                           fontSize: topData && topData.fontSize,
                                           fontWeight: topData && topData.textActions.bold ? 'bold' : '100',
                                           fontStyle: topData && topData.textActions.italic ? 'italic' : 'none',
                                           textDecoration: topData && topData.textActions.underline ? 'underline' : 'none',
                                           textAlign: topData && topData.alignment
                                       }}>
                                        {topData && topData.text}
                                    </p>

                                    <p className={style.description}
                                       style={{
                                           color: `rgba(${descriptionData && descriptionData.color.r}, ${descriptionData && descriptionData.color.g}, ${descriptionData && descriptionData.color.b}, ${descriptionData && descriptionData.color.a})`,
                                           fontSize: descriptionData && descriptionData.fontSize,
                                           fontWeight: descriptionData && descriptionData.textActions.bold ? 'bold' : '100',
                                           fontStyle: descriptionData && descriptionData.textActions.italic ? 'italic' : 'none',
                                           textDecoration: descriptionData && descriptionData.textActions.underline ? 'underline' : 'none',
                                           textAlign: descriptionData && descriptionData.alignment
                                       }}>
                                        {descriptionData && descriptionData.text}
                                    </p>
                                </div>
                                <Methods methods={methods}/>
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
                </div>
            </div>
        )
    }
}

export default Preview;
