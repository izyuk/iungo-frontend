import React, {Component} from 'react';
import {connect} from 'react-redux';
import Notification from '../additional/notification';

class HotspotTable extends Component {
    state = {
        list: '',
        copied: false
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.hotspotList !== nextProps.hotspotList) {
            this.setState({
                list: nextProps.hotspotList
            });
            return true
        }
        else if (this.state.copied !== nextState.copied) return true;
        else return false
    }

    getDataToEdit = (e, currentHotSpotId, portal) => {
        e.preventDefault();
        const {hotspotList} = this.props;
        const {[0]: {id, name, address, description}} = hotspotList.filter(el => el.id === currentHotSpotId);
        this.props.editHandler(id, name, address, description, portal && portal.id);
    };

    copyToClipboard = (e) => {
        const NODE = e.currentTarget;
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(NODE);
        selection.removeAllRanges();
        selection.addRange(range);
        console.log(selection.addRange(range));
        try {
            let successful = document.execCommand('copy');
            this.setState({
                copied: successful
            });
            selection.removeAllRanges();
            let msg = successful ? 'successful' : 'unsuccessful';
            console.info('Copying text command was ' + msg);
        } catch (err) {
            console.warn('Oops, unable to copy');
        }
        e.preventDefault();
        setTimeout(() => {
            this.setState({copied: false});
        }, 2000)
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
                    const {id, name, address, description, virtualUrl, portal } = item;
                    return (
                        <tr key={i} onClick={(e) => ::this.getDataToEdit(e, id, portal)}>
                            <td>{name}</td>
                            <td>{address}</td>
                            <td>{description}</td>
                            <td className={"url"}>
                                {virtualUrl !== null ?
                                    <a href={`${virtualUrl}`}
                                       onClick={this.copyToClipboard}
                                    >
                                        {virtualUrl}
                                    </a>
                                    : ''
                                }
                            </td>
                        </tr>
                    )
                })}
                </tbody>
                {this.state.copied && <Notification type={'info'} text={'Virtual URL was copied'}/>}
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
