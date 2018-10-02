import React, { Component } from 'react';
import { Picker } from './palette';

class Palette extends Component{
    constructor(props){
        super(props);
        this.state={};
        this.palette = new React.createRef();
    }
    componentDidMount(){
        // picker.constructor(this.palette.current, 250, 220);

        console.log(document.querySelector('canvas'));
        let picker = new Picker(document.querySelector('canvas'), 250, 220);

        setInterval(() => picker.draw(), 1)

        // picker.onChange((color) => {
        //     let selected = document.getElementsByClassName("selected")[0];
        //     selected.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        // });
    }
    render(){
        ;

        return(
            <canvas ref={this.palette} >

            </canvas>
        )
    }
}

export default Palette;
