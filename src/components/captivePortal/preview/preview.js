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
    SuccessText = React.createRef();
    TopText = React.createRef();
    DescriptionText = React.createRef();

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
        rest.type === 'none' ? this.ContainerMain.current.style.boxShadow = 'none' : this.ContainerMain.current.style.boxShadow = '0 1px 9px 0 rgba(191, 197, 210, 0.25)';
        this.ContainerMain.current.style.borderWidth = rest.thickness ? `${rest.thickness}px` : false;
        this.ContainerMain.current.style.borderStyle = rest.type ? `${rest.type}` : false;
        this.ContainerMain.current.style.borderColor = color ? `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})` : false;
        this.ContainerMain.current.style.borderRadius = rest.radius ? `${rest.radius}px` : false;
        this.ContainerMain.current.style.background = background.color ? `rgba(${background.color.rgba.r},${background.color.rgba.g},${background.color.rgba.b},${background.color.rgba.a})` : false;
        this.ContainerMain.current.style.opacity = background.opacity ? background.opacity / 100 : false;
        this.ContainerMain.current.style.maxWidth = `${width}px`;
        this.ContainerMain.current.style.padding = `${padding}px`;
    };

    textStyling = (ref, stylesObj) => {
        console.log(ref.current);
        ref.current.style.color = `rgba(${stylesObj && stylesObj.styles.color.rgba.r}, ${stylesObj && stylesObj.styles.color.rgba.g}, ${stylesObj && stylesObj.styles.color.rgba.b}, ${stylesObj && stylesObj.styles.color.rgba.a})`;
        ref.current.style.fontSize = stylesObj && stylesObj.styles.fontSize;
        ref.current.style.fontWeight = stylesObj && stylesObj.styles.textActions.bold ? 'bold' : '100';
        ref.current.style.fontStyle = stylesObj && stylesObj.styles.textActions.italic === true ? 'italic' : 'normal';
        ref.current.style.textDecoration = stylesObj && stylesObj.styles.textActions.underline ? 'underline' : 'none';
        ref.current.style.textAlign = stylesObj && stylesObj.styles.alignment;
    };

    componentDidUpdate() {
        this.container(this.props.state.container);
        if(!this.props.state.successMessageComponentStatus){
            this.textStyling(this.TopText, this.props.header.top);
            this.textStyling(this.DescriptionText, this.props.header.top);
            this.textStyling(this.FooterText, this.props.footer);
        } else {
            this.textStyling(this.SuccessText, this.props.success);
        }
    }

    componentDidMount() {
        this.container(this.props.state.container);
        if(!this.props.state.successMessageComponentStatus){
            this.textStyling(this.TopText, this.props.header.top);
            this.textStyling(this.DescriptionText, this.props.header.top);
            this.textStyling(this.FooterText, this.props.footer);
        } else {
            this.textStyling(this.SuccessText, this.props.success);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.logoName !== nextState.logoName) return true;
        else if (this.state.backgroundColor !== nextState.backgroundColor) return true;
        else if (this.props.state !== nextProps.state) return true;
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
        else if (this.props.state.successData !== nextProps.state.successData) return true;
        else if (this.props.state.acceptButton !== nextProps.state.acceptButton) return true;
        else if (this.props.state.successMessageComponentStatus !== nextProps.state.successMessageComponentStatus) return true;
        else if (this.props.header.top !== nextProps.header.top) return true;
        else if (this.props.header.description !== nextProps.header.description) return true;
        else return false;
    }

    render() {
        let topData = this.props.header.top;
        let descriptionData = this.props.header.description;
        let footerData = this.props.footer;
        let successData = this.props.success;
        let {methods, successMessageComponentStatus, acceptButton} = this.props.state;
        console.log(this.props.state);
        return (
            <div className="previewWrap">
                <div className={this.props.state.mobile ? "previewMain mobile" : "previewMain"}
                     ref={this.PreviewMain}>
                    <div className="previewContainer">
                        <div className="header">
                            <div className="previewLogoPlace" style={{justifyContent: this.props.state.alignment}}>
                                {this.props.state.logoName !== '' ?
                                    <img src={`${this.props.state.logoName}`} alt=""/> : ''}
                            </div>
                        </div>
                        <div className="section"
                             ref={this.ContainerMain}>
                            {!successMessageComponentStatus ?
                                <div className="contentPlace">
                                    <div className="textPlace">
                                        <p className="head" ref={this.TopText}>
                                            {topData && topData.text}
                                        </p>

                                        <p className="description" ref={this.DescriptionText}>
                                            {descriptionData && descriptionData.text}
                                        </p>
                                    </div>
                                    <Methods methods={methods} button={acceptButton}/>
                                </div>
                                :
                                <div className="contentPlace">
                                    <p className="text" ref={this.SuccessText}>
                                        {successData && successData.text}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="footer">
                        <div className="contentPlace">
                            <p className="text" ref={this.FooterText}>
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
