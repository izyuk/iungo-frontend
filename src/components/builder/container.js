import React, {Component} from 'react';
// import {SketchPicker} from "react-color";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            displayColorPicker2: false,
            color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1',
            },
            color2: {
                r: '241',
                g: '112',
                b: '19',
                a: '1',
            }
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});

    };

    handleChange = (color) => {
        this.setState({color: color.rgb});
    };
    handleClick2 = () => {
        this.setState({displayColorPicker2: !this.state.displayColorPicker2})
    };

    handleClose2 = () => {
        this.setState({displayColorPicker2: false});

    };

    handleChange2 = (color) => {
        this.setState({color2: color.rgb});
    };

    render() {
        const styles = {
            color: {
                width: '70px',
                height: '35px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
            },
            color2: {
                width: '70px',
                height: '35px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color2.r }, ${ this.state.color2.g }, ${ this.state.color2.b }, ${ this.state.color2.a })`,
            },
            swatch: {
                padding: '3px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
                float: 'left'
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
                left: '265px'
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            }
        };
        return (
            <div className={this.props.style.container}>
                <div className={this.props.style.row}>
                    <div className={this.props.style.left}>
                        <span>Border</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <span>Type</span>
                            <select>
                                <option value="solid">Solid</option>
                            </select>
                        </div>
                        <div className={this.props.style.innerRow}>
                            <span>Color</span>
                            <div>
                                <div style={styles.swatch}
                                     onClick={this.handleClick}>
                                    <div style={styles.color}/>
                                </div>
                                {this.state.displayColorPicker ?
                                    <div style={styles.popover}>
                                        <div style={styles.cover}
                                             onClick={this.handleClose}/>
                                        {/*<SketchPicker color={this.state.color}*/}
                                                      {/*onChange={this.handleChange}/>*/}
                                    </div> :
                                    null}
                            </div>
                        </div>
                        <div className={this.props.style.innerRow}>
                            <span>Thickness</span>
                            <input type="number"/>
                        </div>
                        <div className={this.props.style.innerRow}>
                            <span>Border Radius</span>
                            <input type="number"/>
                        </div>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.left}>
                        <span>Background</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <span>Color</span>
                            <div>
                                <div style={styles.swatch}
                                     onClick={this.handleClick2}>
                                    <div style={styles.color2}/>
                                </div>
                                {this.state.displayColorPicker2 ?
                                    <div style={styles.popover}>
                                        <div style={styles.cover}
                                             onClick={this.handleClose2}/>
                                        {/*<SketchPicker color={this.state.color2}*/}
                                                      {/*onChange={this.handleChange2}/>*/}
                                    </div> :
                                    null}
                            </div>
                        </div>

                        <div className={this.props.style.innerRow}>
                            <span>Opacity ---  ?</span>
                        </div>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.left}>
                        <span>Size</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <span>Width</span>
                            <input type="text"/>
                        </div>
                        <div className={this.props.style.innerRow}>
                            <span>Padding</span>
                            <input type="text"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Container;
