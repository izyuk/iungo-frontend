import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';

export default class Position extends Component {


    static contextType = CaptivePortalContext;
    
    state = {
        option: this.context.style.background_and_logo.desktopBackground.position.option,
        posX: this.context.style.background_and_logo.desktopBackground.position.posX,
        posY: this.context.style.background_and_logo.desktopBackground.position.posY,
    };

    posXInput = React.createRef();
    custom = React.createRef();
    position = React.createRef();

    onFocusHandler = () => {
        const currentState = this.state;
        this.custom.current.checked = true;
        this.context.setBackgroundPosition(currentState, true);
    };

    changePosX = (e) => {
        const currentState = this.state;
        currentState.posX = parseInt(e.currentTarget.value);
        currentState.option = `${e.currentTarget.value}% ${currentState.posY}%`;
        this.setState(currentState);
        this.context.setBackgroundPosition(currentState, true);
    };

    changePosY = (e) => {
        const currentState = this.state;
        currentState.posY = parseInt(e.currentTarget.value);
        currentState.option = `${currentState.posX}% ${e.currentTarget.value}%`;
        this.setState(currentState);
        this.context.setBackgroundPosition(currentState, true);
    };

    componentDidMount(){
        this.getPositionSettings();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextContext.previewDeviceType !== this.context.previewDeviceType ||
            nextContext.name !== this.context.name ||
            nextContext.style !== this.context.style) {
            this.getPositionSettings(nextContext);
        }
    }

    backgroundPosition = (e) => {
        const currentState = this.state;
        if (e.currentTarget.value === 'custom-position') {
            this.custom.current.style.display = 'flex';
            const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            const span = e.currentTarget.nextSibling.children[0];
            span.innerText = data;
            currentState.option = data;
            // this.setState(currentState);
            this.context.setBackgroundPosition(currentState, true);
        } else {
            this.custom.current.style.display = 'none';
            const data = e.currentTarget.options[e.currentTarget.selectedIndex].value;
            const span = e.currentTarget.nextSibling.children[0];
            span.innerText = data;
            currentState.option = data;
            this.context.setBackgroundPosition(currentState, false);
        }
        this.setState(currentState);

    };

    getPositionSettings(nextContext) {
        const context = nextContext || this.context;
        const {style: { background_and_logo }, previewDeviceType} = context;
        const background = background_and_logo[`${previewDeviceType}Background`] || background_and_logo.desktopBackground;
        const position = background.position;
        if (position.inPercentDimension) {
            this.position.current.value = 'custom-position';
            console.log(this.position.current.value);
            this.custom.current.style.display = 'flex'
        } else {
            this.custom.current.style.display = 'none';
            this.position.current.value = position.option;
        }

        let span = document.createElement('span');
        const children = this.position.current.nextSibling.children;
        if (children.length > 1) {
            span = children[0];
        } else {
            let svg = children[0];
            this.position.current.nextSibling.insertBefore(span, svg);
        }
        span.innerText = this.position.current.options[this.position.current.selectedIndex].value;
        
        this.setState({ option: position.option, posX: position.posX, posY: position.posY });
    }

    render() {
        return (
            <div className="row">
                <div className="logoLeft">
                    <span className="descr position">
                        Position
                    </span>
                </div>
                <div className="right">
                    <div className="innerRow">
                        <div className="innerCol">
                            <div className="innerRow">
                                <select ref={this.position}
                                        data-cy={'backgroundPosition'}
                                        onChange={this.backgroundPosition}>
                                    <option value="left top">left top</option>
                                    <option value="left center">left center</option>
                                    <option value="left bottom">left bottom</option>
                                    <option value="right top">right top</option>
                                    <option value="right center">right center</option>
                                    <option value="right bottom">right bottom</option>
                                    <option value="center top">center top</option>
                                    <option value="center center">center center</option>
                                    <option value="center bottom">center bottom</option>
                                    <option value="custom-position">Custom position</option>
                                </select>
                                <p className="select">
                                    <Icons.DropdownIcon/>
                                </p>
                            </div>
                            <label className={'inputs'} htmlFor="custom-number" ref={this.custom}>
                                <div className="inputRadioWrap">
                                    <p className={'label'}>Axis X</p>
                                    <input onChange={this.changePosX}
                                           ref={this.posXInput}
                                           onFocus={this.onFocusHandler}
                                           id='custom-number-x'
                                           datatype={'custom-number-x'}
                                           name='background_position'
                                           type="number"
                                           placeholder={'By axis X'}
                                           step={'1'}
                                           value={this.state.posX}/>
                                    &nbsp;%
                                </div>
                                <div className="inputRadioWrap">
                                    <p className={'label'}>Axis Y</p>
                                    <input onChange={this.changePosY}
                                           onFocus={this.onFocusHandler}
                                           id='custom-number-y'
                                           datatype={'custom-number-y'}
                                           name='background_position'
                                           type="number"
                                           placeholder={'By axis Y'}
                                           step={'1'}
                                           value={this.state.posY}/>
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