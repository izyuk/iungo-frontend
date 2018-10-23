import React, {Component} from 'react';

import style from './captive-portal.less';

import Options from '../builder/options';


class CaptivePortal extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div className={[style.container].join(' ')}>
                <div className={[style.wrap, style.wrapFix].join(' ')}>
                    <div className={[style.container, style.containerFix].join(' ')}>
                        <div className={[style.wrap, style.wrapFix2].join(' ')}>
                            <div className={style.info}>
                                <h3>Captive Portal Builder</h3>
                                <div className={style.toggles}>
                                    <a href="javascript:void(0)" className={style.active}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="#BFC6D3" fillRule="nonzero" d="M17.25 6H6.75C6.3 6 6 6.3 6 6.75V14c0 .45.3 1 .75 1H11v2H9v1h6v-1h-2v-2h4.25c.45 0 .75-.55.75-1V6.75c0-.45-.3-.75-.75-.75zM16 8v5H8V8h8z"/>
                                        </svg>
                                        <span>Desktop</span>
                                    </a>
                                    <a href="javascript:void(0)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="#AFB7C8" fillRule="nonzero" d="M15.5 6h-6C8.673 6 8 6.673 8 7.5v9c0 .827.673 1.5 1.5 1.5h6c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5zm-3 10.375a.625.625 0 1 1 0-1.25.625.625 0 0 1 0 1.25zM15 14h-5V8h5v6z" opacity=".8"/>
                                        </svg>
                                        <span>Mobile</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Options/>
                </div>
            </div>
        )
    }
}

export default CaptivePortal;
