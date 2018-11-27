import React, {Component} from 'react';
import HeaderTop from './headerTop'
import HeaderDescription from './headerDescription'
// import style from "../../../options.less";

class HeaderText extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className={this.props.style.container}>
                <HeaderTop style={this.props.style}/>
                <HeaderDescription style={this.props.style}/>
            </div>
        )
    }
}

export default HeaderText;
