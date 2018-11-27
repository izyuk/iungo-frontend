import React, {Component} from 'react';
import {connect} from 'react-redux';

import style from './captive-portal.less';

import Preview from './preview/preview';
import Options from './optionsSidebar/options';
import {upload_file} from "../../reducers/file_upload";

class CaptivePortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: false,
            backgrName: '',
            logoName: '',
            type: '',
            backgroundType: 'color',
            alignment: 'center',
            container: '' || {
                border: this.props.file_upload.content_border,
                background: this.props.file_upload.content_background,
                size: this.props.file_upload.content_size
            }
        };
        this.trigger = this.trigger.bind(this);
        this.eventHandler = this.eventHandler.bind(this);
        this.alignment = this.alignment.bind(this);
        this.containerHandler = this.containerHandler.bind(this);
        this.PreviewMain = React.createRef();
    }

    eventHandler(name, type, backgroundType) {
        if (type === 'background') {
            this.setState({
                backgrName: name
            })
        }
        if (type === 'logo') {
            this.setState({
                logoName: name
            })
        }
        this.setState({
            type: type,
            backgroundType: backgroundType
        })
    }


    containerHandler(data){
        // console.log('captive-portal\n', data);
        this.setState({
            container: data
        })
    }

    alignment(position){
        this.setState({
            alignment: position
        })
    }


    trigger(data) {
        document.querySelectorAll('[data-id]')[0].classList.remove(`${style.active}`);
        document.querySelectorAll('[data-id]')[1].classList.remove(`${style.active}`);

        if (data.target.nodeName === 'A') {
            data.target.classList.add(`${style.active}`);
        }
        else if (data.target.closest('a').getAttribute('data-id')) {
            data.target.closest('a').classList.add(`${style.active}`);
        }

        if (data.target.getAttribute('data-id') === 'mobile' || data.target.closest('a').getAttribute('data-id') === 'mobile') {
            this.setState({
                mobile: true
            });
        } else {
            this.setState({
                mobile: false
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.backgrName !== nextState.backgrName) {
            return true;
        } else if (this.state.logoName !== nextState.logoName) {
            return true;
        } else if (this.state.type !== nextState.type) {
            return true;
        } else if (this.state.backgroundType !== nextState.backgroundType) {
            return true;
        }  else if (this.state.alignment !== nextState.alignment) {
            return true;
        } else if (this.state.mobile !== nextState.mobile) {
            return true;
        } else if (this.state.container !== nextState.container) {
            return true;
        } else {
            return false;
        }
    }

    componentDidMount() {
        console.log(this.state);
    }
    componentDidUpdate() {
        console.log(this.state);
        console.log(this.props.file_upload);
    }

    render() {
        return (
            <div className={[style.container].join(' ')}>
                <div className={[style.wrap, style.wrapFix].join(' ')}>
                    <div className={[style.container, style.containerFix].join(' ')}>
                        <div className={[style.wrap, style.wrapFix2].join(' ')}>
                            <div className={style.info}>
                                <h3>Captive Portal Builder</h3>
                                <div className={style.toggles}>
                                    <a href="javascript:void(0)" data-id="desktop"
                                       className={style.active} onClick={(data) => this.trigger(data)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <path fill="#BFC6D3" fillRule="nonzero"
                                                  d="M17.25 6H6.75C6.3 6 6 6.3 6 6.75V14c0 .45.3 1 .75 1H11v2H9v1h6v-1h-2v-2h4.25c.45 0 .75-.55.75-1V6.75c0-.45-.3-.75-.75-.75zM16 8v5H8V8h8z"/>
                                        </svg>
                                        <span>Desktop</span>
                                    </a>
                                    <a href="javascript:void(0)" data-id="mobile"
                                       onClick={(data) => this.trigger(data)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <path fill="#AFB7C8" fillRule="nonzero"
                                                  d="M15.5 6h-6C8.673 6 8 6.673 8 7.5v9c0 .827.673 1.5 1.5 1.5h6c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5zm-3 10.375a.625.625 0 1 1 0-1.25.625.625 0 0 1 0 1.25zM15 14h-5V8h5v6z"
                                                  opacity=".8"/>
                                        </svg>
                                        <span>Mobile</span>
                                    </a>
                                </div>
                            </div>
                            <Preview state={this.state}/>
                        </div>
                    </div>
                    <Options alignment={this.alignment}
                             handler={this.eventHandler}
                            containerHandler={this.containerHandler }/>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        file_upload: state
    }),
    dispatch => ({})
)(CaptivePortal);
// export default CaptivePortal;
