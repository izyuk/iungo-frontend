import React, {Component} from 'react';
import CaptivePortalContext from "../../../../context/project-context";

export default class Size extends Component {


    static contextType = CaptivePortalContext;

    state = {
        option: this.context.style.background_and_logo.desktopBackground.size.option,
        width: this.context.style.background_and_logo.desktopBackground.size.width,
        height: this.context.style.background_and_logo.desktopBackground.size.height
    };

    widthInput = React.createRef();
    custom = React.createRef();
    size = React.createRef();

    onFocusHandler = () => {
        const currentState = this.state;
        this.custom.current.checked = true;
        this.context.setBackgroundSize(currentState, true);
    };

    changeWidth = (e) => {
        const currentState = this.state;
        currentState.width = parseInt(e.currentTarget.value);
        currentState.option = `${e.currentTarget.value}% ${currentState.height}%`;
        this.setState(currentState);
        this.context.setBackgroundSize(currentState, true);
    };

    changeHeight = (e) => {
        const currentState = this.state;
        currentState.height = parseInt(e.currentTarget.value);
        currentState.option = `${currentState.width}% ${e.currentTarget.value}%`;
        this.setState(currentState);
        this.context.setBackgroundSize(currentState, true);
    };

    componentDidMount(){
        this.getSizeSettings();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.previewDeviceType !== this.context.previewDeviceType ||
            nextContext.name !== this.context.name ||
            nextContext.style !== this.context.style) {
            this.getSizeSettings(nextContext);
        }
    }

    getSizeSettings(nextContext) {
        const context = nextContext || this.context;
        const {style: { background_and_logo }, previewDeviceType} = context;
        const background = background_and_logo[`${previewDeviceType}Background`] || background_and_logo.desktopBackground;
        const size = background.size;
        if (size.inPercentDimension) {
            this.size.current.value = 'custom-size';
            this.custom.current.style.display = 'flex'

        } else {
            this.size.current.value = size.option;
            this.custom.current.style.display = 'none'
        }
        let span = document.createElement('span');
        const children = this.size.current.nextSibling.children;
        if (children.length > 1) {
            span = children[0];
        } else {
            let svg = children[0];
            this.size.current.nextSibling.insertBefore(span, svg);
        }
        span.innerText = this.size.current.options[this.size.current.selectedIndex].value;

        this.setState({ option: size.option, width: size.width, height: size.height });
    }

    backgroundSize = (e) => {
        const currentState = this.state;
        if (e.currentTarget.value === 'custom-size') {
            this.custom.current.style.display = 'flex';
            const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            const span = e.currentTarget.nextSibling.children[0];
            span.innerText = data;
            currentState.option = data;
            this.context.setBackgroundSize(currentState, true);
        } else {
            this.custom.current.style.display = 'none';
            const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            const span = e.currentTarget.nextSibling.children[0];
            span.innerText = data;
            currentState.option = data;
            this.context.setBackgroundSize(currentState, false);
        }
        this.setState(currentState);

    };

    render() {
        return (
            <div className="row">
                <div className="logoLeft">
                    <span className="descr position">
                        Size
                    </span>
                </div>
                <div className="right">
                    <div className="innerRow">
                        <div className="innerCol">
                            <div className="innerRow">
                                <select ref={this.size}
                                        data-cy={'backgroundSize'}
                                        onChange={this.backgroundSize}>
                                    <option value="auto">auto</option>
                                    <option value="cover">cover</option>
                                    <option value="contain">contain</option>
                                    <option value="custom-size">Custom size</option>
                                </select>
                                <p className="select">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#BFC5D2" fillRule="nonzero"
                                              d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                    </svg>
                                </p>
                            </div>
                            <label className={'inputs'} htmlFor="custom-number-size" ref={this.custom}>
                                <div className="inputRadioWrap">
                                    <p className={'label'}>Width</p>
                                    <input onChange={this.changeWidth}
                                           data-cy={'backgroundWidth'}
                                           ref={this.widthInput}
                                           onFocus={this.onFocusHandler}
                                           id='custom-number-width'
                                           datatype={'custom-number-width'}
                                           name='size'
                                           type="number"
                                           placeholder={'Width'}
                                           step={'1'}
                                           value={this.state.width}/>
                                    &nbsp;%
                                </div>
                                <div className="inputRadioWrap">
                                    <p className={'label'}>Height</p>
                                    <input onChange={this.changeHeight}
                                           data-cy={'backgroundHeight'}
                                           onFocus={this.onFocusHandler}
                                           id='custom-number-height'
                                           datatype={'custom-number-height'}
                                           name='size'
                                           type="number"
                                           placeholder={'Height'}
                                           step={'1'}
                                           value={this.state.height}/>
                                    &nbsp;%
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}