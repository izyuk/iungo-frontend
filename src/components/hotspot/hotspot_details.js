import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HotspotForm from './hotspotForm';
import HotspotTable from './hotspotTable';

export default class HotspotDetails extends Component {
    state = {correct: false};

    static propTypes = {
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        portalId: PropTypes.number,
        data: PropTypes.object.isRequired
    };

    static defaultProps = {
        name: 'Your name',
        address: 'Your address',
        description: 'Your description',
        url: 'Your virtual URL',
        portalId: 0,
        data: {
            id: 0
        }
    };

    handleInputChange = (e) => {
        const type = e.target.getAttribute('datatype');

        this.props.data[type] = e.target.value
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.data.save()
    };

    handleCorrect = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ correct: !prevState.correct }))
    };

    render() {
        const {
            name,
            address,
            description,
            portalId,
            url,
        } = this.props;
        return (
            <div className="hotspotDetailsWrap">
                <HotspotForm
                    onSubmit={this.handleSubmit}
                    correct={this.state.correct}
                    onCorrect={this.handleCorrect}>

                    <div>
                        {/*<span>Name</span>*/}
                        <input
                            type="text"
                            datatype="name"
                            placeholder={name}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        {/*<span>Address</span>*/}
                        <input
                            type="text"
                            datatype="address"
                            placeholder={address}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        {/*<span>Description</span>*/}
                        <textarea
                            datatype="description"
                            placeholder={description}
                            onChange={this.handleInputChange}>

                        </textarea>
                    </div>
                    <div>
                        {/*<span>Address</span>*/}
                        <input
                            type="text"
                            datatype="url"
                            placeholder={url}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        {/*<span>PortalId</span>*/}
                        <input
                            type="number"
                            datatype="portalId"
                            onChange={this.handleInputChange}/>
                    </div>
                </HotspotForm>
                <HotspotTable/>

                {/*</HotspotTable>*/}
            </div>
        )
    }
}

