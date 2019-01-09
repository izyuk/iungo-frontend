import React, {Component} from 'react';
import HeaderTop from './headerTop'
import HeaderDescription from './headerDescription'

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
            <div className="container">
                <HeaderTop handler={this.textTopData}/>
                <HeaderDescription handler={this.textDescriptionData}/>
            </div>
        )
    }
}

export default HeaderText;
