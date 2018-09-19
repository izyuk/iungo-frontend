import React, {Component} from 'react';


import style from './builder.less';

class Options extends Component {
    constructor(props){
        super(props);
        this.selectColor = this.selectColor.bind(this);
        this.inputRef = React.createRef();
    }

    selectColor(e){
        console.log(e.target.value);
        this.inputRef.current.style.backgroundColor = e.target.value;
    }

    render() {
        return (
            <div className={style.options}>
                <p className="name">Builder</p>
                <div className={style.wrap}>
                    <ul className={style.buttonsWrap}>
                        <li className={style.active}>Style</li>
                        <li>Content</li>
                        <li>Settings</li>
                    </ul>
                    <div className={style.dropdown}>
                        <div className={style.head}>
                            <span>Background</span>
                        </div>
                        <div className={style.container}>
                            <div className={style.imagePreview}>
                                <span ref={this.inputRef}>Item</span>
                            </div>
                            <div className={style.row}>
                                <span className={style.descr}>
                                    upload backgr img
                                </span>
                                <input type="file"/>
                            </div>
                            <p className={style.hr}>or</p>
                            <div className={style.row}>
                                <label htmlFor="sbc">Set backgr color</label>
                                <input type="text" onBlur={(e)=>this.selectColor(e)} placeholder="Color code"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    // componentDidMount() {
    //     this.inputRef.current.focus();
    // }
}

export default Options;
