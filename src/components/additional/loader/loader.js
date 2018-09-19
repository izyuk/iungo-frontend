import style from '../../index.less';
import React, {Component} from 'react';

class Loader extends Component {
    render() {
        return (
            <div className={style.loader}>
                <span></span>
            </div>
        );
    }
}

export default Loader;
