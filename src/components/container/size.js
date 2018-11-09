import React, { Component } from 'react';

class ContainerSize extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style.header}>Size</span>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Width</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <input type="text"/>
                        </div>
                    </div>
                </div>
                <div className={this.props.style.row}>
                    <div className={this.props.style.logoLeft}>
                        <span className={this.props.style}>Padding</span>
                    </div>
                    <div className={this.props.style.right}>
                        <div className={this.props.style.innerRow}>
                            <input type="text"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContainerSize;
