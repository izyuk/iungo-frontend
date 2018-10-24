import React, {Component} from 'react';

import style from './preview.less';

class Preview extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <div className={style.previewWrap}>
                <div className={style.previewMain}>

                </div>
            </div>
        )
    }
}

export default Preview;
