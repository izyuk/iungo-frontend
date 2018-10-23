import React, { Component } from 'react';

import style from './builder.less';
import Options from './options';
import Preview from './preview';

class Builder extends Component {
    render(){
        return(
            <div className={style.builder}>
                <Options/>
            </div>
        )
    }
}

export default Builder;
