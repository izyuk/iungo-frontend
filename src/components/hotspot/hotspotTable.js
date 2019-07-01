import React, {Component} from 'react';
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

    copyToClipboard = (e) => {
        const NODE = e.currentTarget;
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(NODE);
        selection.removeAllRanges();
        selection.addRange(range);
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
                    <th>CP name</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Virtual URL</th>
                    <th>Updated</th>
                </tr>
                </thead>
                <tbody>
                {hotspotList && hotspotList}
                </tbody>
                {this.state.copied && <Notification type={'info'} text={'Virtual URL was copied'}/>}
            </table>
        )
    }

}

export default HotspotTable;
