import React, {Component} from 'react';
import {connect} from 'react-redux';
import {upload_file} from '../../../../../reducers/file_upload';
import ImageUploader from '../../../imageUploader/imageUploader';

class Logo extends Component {
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

export default connect(
    state => ({
        file_upload: state,
        position: state.position
    }),
    dispatch => ({
        uploadFile: (path) => {
            dispatch({type: "UPLOAD_LOGO", payload: path});
        },
        logoPos: (position) => {
            dispatch({type: "LOGO_POSITION", payload: position});
        }
    })
)(ImageUploader);