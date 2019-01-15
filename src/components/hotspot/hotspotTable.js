import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

// HotspotTable.propTypes = {
//     // onCorrect: PropTypes.func.isRequired,
//     // expanded: PropTypes.bool
// };

class HotspotTable extends Component {
    state = {
        list: ''
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.hotspotList !== nextProps.hotspotList) {
            this.setState({
                list: nextProps.hotspotList
            });
            return true
        } else {
            return false
        }
    }

    getDataToEdit = (e, currentId) => {
        e.preventDefault();
        const {hotspotList} = this.props;
        const {[0]: {id, name, address, description}} = hotspotList.filter(el => el.id === currentId);
        this.props.editHandler(id, name, address, description);
        console.log(id, name, address, description);
    };

    render() {
        const {hotspotList} = this.props;
        console.log(hotspotList);
        return (
            <table className={"hotspotTable"} rules="rows">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Virtual URL</th>
                </tr>
                </thead>
                <tbody>
                {hotspotList && hotspotList.map((item, i) => {
                    const {id, name, address, description, virtualUrl} = item;
                    return (
                        <tr key={i} onClick={(e) => ::this.getDataToEdit(e, id)}>
                            <td>{name}</td>
                            <td>{address}</td>
                            <td>{description}</td>
                            <td className={"url"}>
                                {virtualUrl !== null ?
                                    <Link to={virtualUrl}>{`${virtualUrl.slice(0, 10)}...`}</Link>
                                    : ''
                                }
                            </td>
                        </tr>
                    )
                })}
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
