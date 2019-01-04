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
        token: state.token
    }),
    dispatch => ({
        uploadFile: (path, color) => {
            dispatch({type: "UPLOAD_BACKGROUND", payload: {path, color}});
        },
        setID: (num) => {
            dispatch({type: "SET_backgroundID", payload: num});
        }
    })
)(ImageUploader);
