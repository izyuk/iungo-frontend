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
        file_upload: state,
        color: state.color
    }),
    dispatch => ({
        uploadFile: (path) => {
            dispatch({type: "UPLOAD_BACKGROUND", payload: path});
        },
        updateColor: (hex, rgba) => {
            dispatch({type: "BACKGROUND_COLOR", payload: {hex: hex, rgba: rgba}});
        }
    })
)(ImageUploader);
