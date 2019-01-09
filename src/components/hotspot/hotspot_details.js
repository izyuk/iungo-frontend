import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class HotspotDetails extends Component {
    state = {};

    static propTypes = {
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        portalId: PropTypes.number,
        writable: true
    };

    static defaultProps = {
        name: 'Your name',
        address: 'Your address',
        description: 'Your description',
        portalId: 0,
    };

    handleInputChange = (e) => {
        const type = e.target.getAttribute('datatype');
        console.log(type);
        console.log(this.props[type]);

        this.props[type] = e.target.value
    };

    render() {
        const {
            name,
            address,
            description,
            portalId,
        } = this.props;
        return (
            <div className="hotspotDetailsWrap">
                <div className="hotspotForm">
                    <div>
                        <span>Name</span>
                        <input
                            type="text"
                            datatype="name"
                            value={name}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <span>Address</span>
                        <input
                            type="text"
                            datatype="address"
                            value={address}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <span>Description</span>
                        <textarea
                            datatype="description"
                            value={description}
                            onChange={this.handleInputChange}>

                        </textarea>
                    </div>
                    <div>
                        <span>PortalId</span>
                        <input
                            type="number"
                            datatype="portalId"
                            value={portalId}
                            onChange={this.handleInputChange}/>
                    </div>
                    <button>Save</button>
                </div>
                <div className="hotspotTable">

                </div>
            </div>
        )
    }
}
