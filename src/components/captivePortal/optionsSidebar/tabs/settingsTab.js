import React, {Component} from 'react';
import CSS from './settingsComponents/css';
import Icons from '~/static/images/icons';

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
                        <Icons.DropdownIcon/>
                    </div>
                    {this.state.visible === 'CSS' ?
                        <CSS findPortal={this.props.findPortal} clearExternalCss={this.props.clearExternalCss}/> :
                        false}
                </div>
            </div>
        )
    }
}

export default SettingsTab;
