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

    componentDidMount(){
        this.getRepeatingSettings();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.previewMobile !== this.context.previewMobile) {
            this.getRepeatingSettings(nextContext);
        }
    }

    getRepeatingSettings(nextContext) {
        const context = nextContext || this.context;
        const {style: { background_and_logo }, previewMobile} = context;
        const background = previewMobile && background_and_logo.mobileBackground || background_and_logo.desktopBackground;
        const repeat = background.repeat;
        this.repeating.current.value = repeat;

        let span = document.createElement('span');
        const children = this.repeating.current.nextSibling.children;
        if (children.length > 1) {
            span = children[0];
        } else {
            let svg = children[0];
            this.repeating.current.nextSibling.insertBefore(span, svg);
        }
        span.innerText = this.repeating.current.options[this.repeating.current.selectedIndex].value;
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