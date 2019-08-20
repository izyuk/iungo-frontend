import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CaptivePortalContext from "../../context/project-context";

let place = document.getElementById('notification');

class Notification extends Component {

    static contextType = CaptivePortalContext;

    state = {};

    notification = React.createRef();

    componentDidMount() {
        this.notification.current.classList.add(this.context.dataToExclude.failed ? 'fail' : 'info');
    }

    render() {
        return ReactDOM.createPortal(
            <div ref={this.notification} className={'notification'}>
                <p style={{textAlign: 'center'}}>{this.context.dataToExclude.publishedType || this.props.text || ''}</p>
            </div>,
            place
        )
    }
}

export default Notification;
