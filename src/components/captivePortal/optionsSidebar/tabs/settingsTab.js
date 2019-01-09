import React, {Component} from 'react';
import CSS from './settingsComponents/css';

class SettingsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            visible: 'CSS',
        };
        this.CSS = React.createRef();
    }

    componentDidMount() {
        this.setState({
            event: this.CSS.current
        });
    }

    componentDidUpdate() {
        this.state.event.closest(".head").classList.add("active");
        this.state.event.closest(".head").nextSibling.classList.add("active");
    }

    dropDownHandler = (e) => {
        this.setState({
            event: e.currentTarget
        });
        for (let i = 0; i < document.querySelectorAll(".head").length; i++) {
            document.querySelectorAll(".head")[i].classList.remove("active");
        }
        this.setState({
            visible: e.currentTarget.childNodes[0].innerHTML
        });
    };

    render() {
        return (
            <div className="dropdown">
                <div className="wrap">
                    <div
                        className="head"
                        onClick={this.dropDownHandler}
                        ref={this.CSS}>
                        <span>CSS</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#BFC5D2" fillRule="nonzero"
                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                        </svg>
                    </div>
                    {this.state.visible === 'CSS' ?
                        <CSS/> :
                        false}
                </div>
            </div>
        )
    }
}

export default SettingsTab;
