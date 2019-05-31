import React, {Component} from 'react';
import CaptivePortalContext from "../../../../context/project-context";

export default class Repeating extends Component {


    static contextType = CaptivePortalContext;

    state = {
        repeat: 'initial'
    };

    repeating = React.createRef();

    backgroundRepeating = (e) => {
        const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
        const span = e.currentTarget.nextSibling.children[0];
        span.innerText = data;
        const currentState = this.state;
        currentState.repeat = data;
        this.setState(currentState);
        this.context.setBackgroundRepeating(data);
        this.setState(currentState);
    };

    componentDidMount() {
        const {style: {background_and_logo: {background: {repeat}}}} = this.context;
        this.repeating.current.value = repeat;
        let svg = this.repeating.current.nextSibling.children[0];
        let span = document.createElement('span');
        span.innerText = this.repeating.current.options[this.repeating.current.selectedIndex].value;
        this.repeating.current.nextSibling.insertBefore(span, svg);
    }

    render() {
        return (
            <div className="row">
                <div className="logoLeft">
                    <span className="descr position">
                        Repeating
                    </span>
                </div>
                <div className="right">
                    <div className="innerRow">
                        <select ref={this.repeating}
                                data-cy={'backgroundRepeating'}
                                onChange={this.backgroundRepeating}>
                            <option value="repeat">repeat (axis X & Y)</option>
                            <option value="repeat-x">repeat-x</option>
                            <option value="repeat-y">repeat-y</option>
                            <option value="no-repeat">no-repeat</option>
                        </select>
                        <p className="select">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#BFC5D2" fillRule="nonzero"
                                      d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}