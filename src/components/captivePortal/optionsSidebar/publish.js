import React, {Component} from 'react';
import style from './options.less';
import {connect} from 'react-redux';

class Publish extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        this.getBuilderParams = this.getBuilderParams.bind(this);
    }

    componentDidMount(){
        // console.log(this.props.state);
    }

    getBuilderParams(){
        let portalDataToSend = {};

        let { name, css:{path}, header: {top, description}, footer, background_and_logo: {background, logo, backgroundType}, content_background, content_border, content_size , login_methods: {methods}} = this.props.tabName;

        portalDataToSend['name'] = name;
        portalDataToSend['externalStylesUrl'] = path;
        /*Доробити logoId та backgrId*/
        portalDataToSend['logoId'] = 0;
        portalDataToSend['backgroundId'] = 0;
        portalDataToSend['header'] = top.text;
        portalDataToSend['description'] = description.text;
        portalDataToSend['footer'] = footer.text;
        portalDataToSend['style']['header']['top'] = top.styles;
        portalDataToSend['style']['header']['description'] = description.styles;
        portalDataToSend['style']['footer'] = footer.styles;

        if(backgroundType === 'image'){
            portalDataToSend['style']['background_and_logo']['background']['url'] = background.url.url;
        } else {
            portalDataToSend['style']['background_and_logo']['background']['colorHEX'] = background.url.color[0];
            portalDataToSend['style']['background_and_logo']['background']['color'] = background.url.color[1];
        }

        portalDataToSend['style']['background_and_logo']['logo']['url'] = logo.url;
        portalDataToSend['style']['content_background']['colorHEX'] = content_background.colorHEX;
        portalDataToSend['style']['content_background']['color'] = content_background.color;

        portalDataToSend['style']['content_border']['color'] = content_border.color;
        portalDataToSend['style']['content_border']['colorHEX'] = content_border.colorHEX;
        portalDataToSend['style']['content_border']['type'] = content_border.type;
        portalDataToSend['style']['content_border']['thickness'] = content_border.thickness;
        portalDataToSend['style']['content_border']['radius'] = content_border.radius;
        portalDataToSend['style']['content_size']['width'] = content_size.width;
        portalDataToSend['style']['content_size']['padding'] = content_size.padding;

        portalDataToSend['googleLogin'] = methods.google;
        portalDataToSend['facebookLogin'] = methods.facebook;
        portalDataToSend['twitterLogin'] = methods.twitter;

        console.log(portalDataToSend);
    }

    render(){
        return(
            <div className={style.buttonsRow}>
                <button type="button" onClick={this.getBuilderParams} className={style.publish}>Publish</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        tabName: state
    })
)(Publish);
