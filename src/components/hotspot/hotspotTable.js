import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {getHotspots} from '../../api/API';
import {connect} from 'react-redux';

// HotspotTable.propTypes = {
//     // onCorrect: PropTypes.func.isRequired,
//     // expanded: PropTypes.bool
// };

class HotspotTable extends Component {

    state = {};

    getHotspotsMethodHandler = async(str) => {
        const query = getHotspots(str);
        await query.then(res => {
            console.log(res);
        });
    };

    componentDidMount(){
        console.log(this.props.token.token);
        console.log(localStorage.getItem('token'));
        this.props.token.token !== undefined ? this.getHotspotsMethodHandler(this.props.token.token): this.getHotspotsMethodHandler(localStorage.getItem('token'));
        // this.getHotspotsMethodHandler();
    }

    render(){
        return (
            <table className={"hotspotTable"} rules="rows">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Virtual URL</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Some name</td>
                    <td>Some address</td>
                    <td>Some description</td>
                    <td className={"url"}>
                        <a href="https://stackoverflow.com/questions/43662552/getting-columns-to-wrap-in-css-grid">https://stacko...</a>
                    </td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }

}

export default connect(
    state => ({
        token: state.token
    }),
    dispatch => ({})
)(HotspotTable);
