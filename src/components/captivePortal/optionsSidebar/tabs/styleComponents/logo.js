import React, {Component} from 'react';
import {connect} from 'react-redux';
import {upload_file} from '../../../../../reducers/background_and_logo';
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
        background_and_logo: state,
        position: state.position,
        token: state.token
    }),
    dispatch => ({
        uploadFile: (path, position) => {
            dispatch({type: "UPLOAD_LOGO", payload: {path, position}});
        },
        setID: (num) => {
            dispatch({type: "SET_logoID", payload: num});
        }
    })
)(ImageUploader);
