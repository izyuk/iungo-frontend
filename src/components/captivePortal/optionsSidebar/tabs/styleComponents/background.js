import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageUploader from '../../../imageUploader/imageUploader';


class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div></div>
        )
    }
}

// export default Background;

export default connect(
    state => ({
        background_and_logo: state.background_and_logo,
    }),
    dispatch => ({
        uploadFile: (path, color) => {
            dispatch({type: "UPLOAD_BACKGROUND", payload: {path, color}});
        }
    })
)(ImageUploader);
