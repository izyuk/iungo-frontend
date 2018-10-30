import React, {Component} from 'react';
import {connect} from 'react-redux';
import {upload_file} from '../../reducers/file_upload';
import ImageUploader from '../imageUploader/imageUploader';


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
        file_upload: state
    }),
    dispatch => ({
        uploadFile: (typeString, selectedFile, selectedFileName) => {
            dispatch(upload_file(typeString, selectedFile, selectedFileName));
        }
    })
)(ImageUploader);
