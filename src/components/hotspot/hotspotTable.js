import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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

    getDataToEdit = (e, currentHotSpotId) => {
        e.preventDefault();
        const {hotspotList} = this.props;
        const {[0]: {id, name, address, description}} = hotspotList.filter(el => el.id === currentHotSpotId);
        this.props.editHandler(id, name, address, description);
    };

    copyToClipboard = (e) => {
        const NODE = e.currentTarget;
        console.log(NODE);
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(NODE);
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            let successful = document.execCommand('copy');
            selection.removeAllRanges();
            let msg = successful ? 'successful' : 'unsuccessful';
            console.log(successful);
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        e.preventDefault();
    };

    render() {
        const {hotspotList} = this.props;
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
                    console.log(id);
                    return (
                        <tr key={i} onClick={(e) => ::this.getDataToEdit(e, id)}>
                            <td>{name}</td>
                            <td>{address}</td>
                            <td>{description}</td>
                            <td className={"url"}>
                                {virtualUrl !== null ?
                                    <a href={`${virtualUrl}`}
                                       onClick={this.copyToClipboard}
                                    >
                                        <span>{`${virtualUrl.slice(0, 20)}...`}</span>
                                        {/*{`${virtualUrl.slice(0, 20)}...`}*/}
                                        {virtualUrl}
                                    </a>
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
