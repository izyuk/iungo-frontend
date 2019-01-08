import React, {Component} from 'react';
import HeaderTop from './headerTop'
import HeaderDescription from './headerDescription'

// import style from "../../../options.less";

class HeaderText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: '',
            description: ''
        };
    }

    textTopData = (data) => {
        this.setState({
            top: data
        });
        this.props.textData(this.state);
    };

    textDescriptionData = (data) => {
        this.setState({
            description: data
        });
        this.props.textData(this.state);
    };

    render() {
        return (
            <div className={this.props.style.container}>
                <HeaderTop handler={this.textTopData} style={this.props.style}/>
                <HeaderDescription handler={this.textDescriptionData} style={this.props.style}/>
            </div>
        )
    }
}

export default HeaderText;
