import React, {Component} from 'react';

import Methods from './methods';


class Preview extends Component {
    state = {
        changes: true,
        backgroundType: 'COLOR',
        backgroundColor: this.props.state.logoName.colorHEX,
        logoName: this.props.state.logoName === '' ? 'logo.png' : this.props.state.logoName,
        backgrName: this.props.state.backgrName || ''
    };
    PreviewMain = React.createRef();
    ContainerMain = React.createRef();
    FooterText = React.createRef();

    container = ({border: {color, ...rest}, background, size: {width, padding}}) => {
        if (this.props.state.type === 'background') {
            if (typeof this.props.state.backgrName === 'string') {
                this.PreviewMain.current.style.background = `url(${this.props.state.backgrName})`;
            } else if (typeof this.props.state.backgrName === 'object') {
                const {rgba} = this.props.state.backgrName;
                this.PreviewMain.current.style.background = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
            } else {
                this.PreviewMain.current.style.background = this.state.backgroundColor;
            }
        } else if (this.props.state.type === 'logo') {
            this.PreviewMain.current.style.background = this.state.backgroundColor;
        }
        this.ContainerMain.current.style.borderWidth = rest.thickness ? `${rest.thickness}px` : false;
        this.ContainerMain.current.style.borderStyle = rest.type ? `${rest.type}` : false;
        this.ContainerMain.current.style.borderColor = color ? `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})` : false;
        this.ContainerMain.current.style.borderRadius = rest.radius ? `${rest.radius}px` : false;
        this.ContainerMain.current.style.background = background.color ? `rgba(${background.color.rgba.r},${background.color.rgba.g},${background.color.rgba.b},${background.color.rgba.a})` : false;
        this.ContainerMain.current.style.opacity = background.opacity ? background.opacity / 100 : false;
        this.ContainerMain.current.style.maxWidth = `${width}px`;
        this.ContainerMain.current.style.padding = `${padding}px`;
    };

    componentDidUpdate() {
        this.container(this.props.state.container);
    }

    componentDidMount() {
        this.container(this.props.state.container);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.logoName !== nextState.logoName) return true;
        else if (this.state.backgroundColor !== nextState.backgroundColor) return true;
        else if (this.props.state.logoName !== nextProps.state.logoName) return true;
        else if (this.props.state.backgrName !== nextProps.state.backgrName) return true;
        else if (this.props.state.backgroundType !== nextProps.state.backgroundType) return true;
        else if (this.props.state.type !== nextProps.state.type) return true;
        else if (this.props.state.alignment !== nextProps.state.alignment) return true;
        else if (this.props.state.mobile !== nextProps.state.mobile) return true;
        else if (this.props.state.container !== nextProps.state.container) return true;
        else if (this.props.state.headerText !== nextProps.state.headerText) return true;
        else if (this.props.state.methods !== nextProps.state.methods) return true;
        else if (this.props.state.footerContent !== nextProps.state.footerContent) return true;
        else return false;
    }

    render() {
        let topData = this.props.header.top;
        let descriptionData = this.props.header.description;
        let footerData = this.props.footerTextData;
        let {methods} = this.props.state;
        return (
            <div className="previewWrap">
                <div className={this.props.state.mobile ? "previewMain mobile" : "previewMain"}
                     ref={this.PreviewMain}>
                    <div className="previewContainer">
                        <div className="header">
                            <div className="previewLogoPlace" style={{justifyContent: this.props.state.alignment}}>
                                {this.props.state.logoName === '' ?
                                    <img src={require('../../../static/images/logo.png')} alt=""/> :
                                    <img src={`${this.props.state.logoName}`} alt=""/>}
                            </div>
                        </div>
                        <div className="section"
                             ref={this.ContainerMain}>
                            <div className="contentPlace">
                                <div className="textPlace">
                                    <p className="head"
                                       style={{
                                           color: `rgba(${topData && topData.styles.color.rgba.r}, ${topData && topData.styles.color.rgba.g}, ${topData && topData.styles.color.rgba.b}, ${topData && topData.styles.color.rgba.a})`,
                                           fontSize: topData && topData.styles.fontSize,
                                           fontWeight: topData && topData.styles.textActions.bold ? 'bold' : '100',
                                           fontStyle: topData && topData.styles.textActions.italic === true ? 'italic' : 'normal',
                                           textDecoration: topData && topData.styles.textActions.underline ? 'underline' : 'none',
                                           textAlign: topData && topData.styles.alignment
                                       }}>
                                        {topData && topData.text}
                                    </p>

                                    <p className="description"
                                       style={{
                                           color: `rgba(${descriptionData && descriptionData.styles.color.rgba.r}, ${descriptionData && descriptionData.styles.color.rgba.g}, ${descriptionData && descriptionData.styles.color.rgba.b}, ${descriptionData && descriptionData.styles.color.rgba.a})`,
                                           fontSize: descriptionData && descriptionData.styles.fontSize,
                                           fontWeight: descriptionData && descriptionData.styles.textActions.bold ? 'bold' : '100',
                                           fontStyle: descriptionData && descriptionData.styles.textActions.italic ? 'italic' : 'normal',
                                           textDecoration: descriptionData && descriptionData.styles.textActions.underline ? 'underline' : 'none',
                                           textAlign: descriptionData && descriptionData.styles.alignment
                                       }}>
                                        {descriptionData && descriptionData.text}
                                    </p>
                                </div>
                                <Methods methods={methods}/>
                                <div className="inputsWrap">
                                    <div className="email">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
                                        <g fill="#8D98B0" fillRule="nonzero">
                                            <path d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
                                            <path
                                                d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
                                        </g>
                                    </svg>
                                </span>
                                        <input type="email" placeholder="Continue with Email" autoComplete='off'/>
                                    </div>
                                    <div className="password">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path fill="#8D98B0" fillRule="nonzero"
                                              d="M15.285 12.305l-2.578-2.594a1 1 0 0 0-1.416-.002L9 12 4 7l2.294-2.294a1 1 0 0 0 .001-1.414L3.715.708a1 1 0 0 0-1.415 0L.004 3.003 0 3c0 7.18 5.82 13 13 13l2.283-2.283a1 1 0 0 0 .002-1.412z"/>
                                    </svg>
                                </span>
                                        <input type="text" placeholder="Continue with Phone" autoComplete='off'/>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="footer">
                        <div className="contentPlace">
                            <p className="text" ref={this.FooterText}
                               style={{
                                   color: `rgba(${footerData.styles && footerData.styles.color.rgba.r}, ${footerData.styles && footerData.styles.color.rgba.g}, ${footerData.styles && footerData.styles.color.rgba.b}, ${footerData.styles && footerData.styles.color.rgba.a})`,
                                   fontSize: footerData.styles && footerData.styles.fontSize,
                                   fontWeight: footerData.styles && footerData.styles.textActions.bold ? 'bold' : '100',
                                   fontStyle: footerData.styles && footerData.styles.textActions.italic ? 'italic' : 'normal',
                                   textDecoration: footerData.styles && footerData.styles.textActions.underline ? 'underline' : 'none',
                                   textAlign: footerData.styles && footerData.styles.alignment
                               }}>
                                {footerData && footerData.text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview;
