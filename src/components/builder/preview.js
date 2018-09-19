import React, { Component } from 'react';

import style from './builder.less';
import Loader from '../additional/loader/loader';

class Preview extends Component {
    render(){
        return(
            <div className={style.preview}>
                <p className="name">Preview</p>
                <div className={style.wrap}>
                    <Loader/>
                </div>
            </div>
        )
    }
}

export default Preview;
