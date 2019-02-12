import React, {Component} from 'react';
import ReactDOM from 'react-dom';

let place = document.getElementById('notification');

class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: this.props.type
        }
    }
    notification = React.createRef();
    componentDidMount(){
        this.notification.current.classList.add(this.state.type)
    }
    render() {
        const {text} = this.props;
        return ReactDOM.createPortal(
            <div ref={this.notification} className={'notification'}>
                <p>{text}</p>
            </div>,
            place
        )
    }
}

export default Notification;
