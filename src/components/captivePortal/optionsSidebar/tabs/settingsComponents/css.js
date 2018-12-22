import React, {Component} from 'react';
import { connect } from 'react-redux';

class CSS extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.addStyles = this.addStyles.bind(this);
        this.link = React.createRef();
    }

    addStyles(){
        if(this.link.current.value.length > 0){
            const HEAD = document.getElementsByTagName('HEAD')[0];
            let link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', this.link.current.value);
            HEAD.appendChild(link);
        }
        console.log(JSON.stringify(this.props.background_and_logo));
    }

    render() {
        return (
            <div className={this.props.style.container}>
                <div className={this.props.style.row}>
                    <div className={this.props.style.right}>
                        <span className={this.props.style.innerRow}>Use your external CSS code</span>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.right}>
                        <span className={this.props.style.innerRow}>
                            <span className={this.props.style.urlForm}>
                                <input type="text" placeholder="Paste URL" ref={this.link}/>
                                <button type="button" onClick={this.addStyles}>Set</button>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        background_and_logo: state
    })
)(CSS);
