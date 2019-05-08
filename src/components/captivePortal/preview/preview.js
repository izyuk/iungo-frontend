import React, {Component} from 'react';

import Methods from './methods';
import CaptivePortalContext from "../../../context/captive-portal-context";


class Preview extends Component {
    static contextType = CaptivePortalContext;

    state = {};

    PreviewMain = React.createRef();
    ContainerMain = React.createRef();
    FooterText = React.createRef();

    componentDidMount() {
        const {style} = this.context;
        style.container_border.type === 'none' ? this.ContainerMain.current.style.boxShadow = 'none' : this.ContainerMain.current.style.boxShadow = '0 1px 9px 0 rgba(191, 197, 210, 0.25)';
        if (this.context.externalCss !== '') {
            console.log(this.context.externalCss);
            const HEAD = document.getElementsByTagName('HEAD')[0];
            const style = document.getElementsByTagName('STYLE')[0] ? document.getElementsByTagName('STYLE')[0] : document.createElement('style');
            style.type = 'text/css';
            style.innerText = this.context.externalCss;

            HEAD.appendChild(style);

            const styledElements = document.querySelectorAll('.previewWrap [style]');
            let stylesArray = [];
            Object.keys(styledElements).map((item, i) => {
                stylesArray.push(styledElements[item].getAttribute('style'));
            });
            Object.keys(styledElements).map((item, i) => {
                styledElements[item].removeAttribute('style');
            });
            this.context.setExternalCssInfo(this.context.externalCss, true, styledElements, stylesArray);
            console.log(document.querySelectorAll('.previewWrap [style]'));
        }

    }

    componentDidUpdate() {
        const {style} = this.context;
        style.container_border.type === 'none' ? this.ContainerMain.current.style.boxShadow = 'none' : this.ContainerMain.current.style.boxShadow = '0 1px 9px 0 rgba(191, 197, 210, 0.25)';
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.state.mobile !== nextProps.state.mobile) return true;
        else if (this.context !== nextContext) return true;
        else return false;
    }

    render() {
        const {
            style: {header: {top, description}, footer, container_background, container_border, container_size, background_and_logo: {background}, success_message}
        } = this.context;
        return (
            <div className="previewWrap">
                <div className={this.props.state.mobile ? "previewMain mobile" : "previewMain"}
                     ref={this.PreviewMain}
                     style={{
                         background: background.backgroundType === 'COLOR' ?
                             `rgba(${background.color.rgba.r}, ${background.color.rgba.g}, ${background.color.rgba.b}, ${background.color.rgba.a})` :
                             `url(${background.url})`
                     }}
                >
                    <div className="previewContainer">
                        <div className="header">
                            <div className="previewLogoPlace"
                                 style={{justifyContent: this.context.style.background_and_logo.logo.position}}>
                                {this.context.style.background_and_logo.logo.url !== '' ?
                                    <img src={`${this.context.style.background_and_logo.logo.url}`} alt=""/> : ''}
                            </div>
                        </div>
                        <div className="section"
                             ref={this.ContainerMain}
                             style={{
                                 borderWidth: `${container_border.thickness}px`,
                                 borderStyle: container_border.type,
                                 borderColor: `rgba(${container_border.color.rgba.r},${container_border.color.rgba.g},${container_border.color.rgba.b},${container_border.color.rgba.a})`,
                                 borderRadius: container_border.radius,
                                 background: `rgba(${container_background.color.rgba.r},${container_background.color.rgba.g},${container_background.color.rgba.b},${container_background.color.rgba.a})`,
                                 opacity: container_background.opacity / 100,
                                 maxWidth: `${container_size.width}px`,
                                 padding: `${container_size.padding}px`
                             }}>
                            {!this.context.dataToExclude.successMessageStatus ?
                                <div className="contentPlace">
                                    <div className="textPlace">
                                        <p className="head"
                                           style={{
                                               color: `rgba(${top && top.color.rgba.r}, ${top && top.color.rgba.g}, ${top && top.color.rgba.b}, ${top && top.color.rgba.a})`,
                                               fontSize: top && top.fontSize,
                                               fontWeight: top && top.textActions.bold ? 'bold' : '100',
                                               fontStyle: top && top.textActions.italic === true ? 'italic' : 'normal',
                                               textDecoration: top && top.textActions.underline ? 'underline' : 'none',
                                               textAlign: top && top.alignment
                                           }}>
                                            {this.context.header && this.context.header}
                                        </p>

                                        <p className="description"
                                           style={{
                                               color: `rgba(${description && description.color.rgba.r}, ${description && description.color.rgba.g}, ${description && description.color.rgba.b}, ${description && description.color.rgba.a})`,
                                               fontSize: description && description.fontSize,
                                               fontWeight: description && description.textActions.bold ? 'bold' : '100',
                                               fontStyle: description && description.textActions.italic ? 'italic' : 'normal',
                                               textDecoration: description && description.textActions.underline ? 'underline' : 'none',
                                               textAlign: description && description.alignment
                                           }}>
                                            {this.context.description && this.context.description}
                                        </p>
                                    </div>
                                    <Methods/>
                                </div>
                                :
                                <div className="contentPlace">
                                    <p className="text"
                                       style={{
                                           color: `rgba(${success_message && success_message.color.rgba.r}, ${success_message && success_message.color.rgba.g}, ${success_message && success_message.color.rgba.b}, ${success_message && success_message.color.rgba.a})`,
                                           fontSize: success_message && success_message.fontSize,
                                           fontWeight: success_message && success_message.textActions.bold ? 'bold' : '100',
                                           fontStyle: success_message && success_message.textActions.italic ? 'italic' : 'normal',
                                           textDecoration: success_message && success_message.textActions.underline ? 'underline' : 'none',
                                           textAlign: success_message && success_message.alignment
                                       }}>
                                        {this.context.successMessage && this.context.successMessage}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="footer">
                        <div className="contentPlace">
                            <p className="text" ref={this.FooterText}
                               style={{
                                   color: `rgba(${footer && footer.color.rgba.r}, ${footer && footer.color.rgba.g}, ${footer && footer.color.rgba.b}, ${footer && footer.color.rgba.a})`,
                                   fontSize: footer && footer.fontSize,
                                   fontWeight: footer && footer.textActions.bold ? 'bold' : '100',
                                   fontStyle: footer && footer.textActions.italic ? 'italic' : 'normal',
                                   textDecoration: footer && footer.textActions.underline ? 'underline' : 'none',
                                   textAlign: footer && footer.alignment
                               }}>
                                {this.context.footer && this.context.footer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview;
