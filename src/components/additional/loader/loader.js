import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Loader extends Component {
    render() {
        return ReactDOM.createPortal(
            <div className={"loader"}>
                <span></span>
            </div>,
            document.getElementById('loaderPlace')
        );
    }
}

export default Loader;
