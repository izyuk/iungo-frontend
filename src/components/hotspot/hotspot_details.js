import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HotspotForm from './hotspotForm';
import HotspotTable from './hotspotTable';

import {createHotspot, getHotspots, updateHotspotById, getAllPortals} from '../../api/API';
import connect from "react-redux/es/connect/connect";

class HotspotDetails extends Component {
    state = {
        incorrect: false,
        name: '',
        address: '',
        description: '',
        url: '',
        list: '',
        id: '',
        portalsList: ''
    };

    static propTypes = {
        // name: PropTypes.string.isRequired,
        // address: PropTypes.string.isRequired,
        // description: PropTypes.string.isRequired,
        // url: PropTypes.string.isRequired,
        // portalId: PropTypes.number,
        // data: PropTypes.object.isRequired
    };

    static defaultProps = {
        // name: 'Your name',
        // address: 'Your address',
        // description: 'Your description',
        // url: 'Your virtual URL',
        // portalId: 0,
        // data: {
        //     id: 0
        // }
    };

    handleInputChange = (e) => {
        const type = e.target.getAttribute('datatype');

        this.state[type] = e.target.value
    };

    getHotspotsMethodHandler = async (str) => {
        const query = getHotspots(str);
        await query.then(res => {
            const {data} = res;
            this.setState({
                list: data
            })
        });
    };

    getAllPortalsMethodHandler = async (str) => {
        const query = getAllPortals(str);
        await query.then(res => {
            const {data} = res;
            console.log(data);
            // let arr = [];
            // data.map((item, i) => {
            //     arr.push(`<p key=${i} dataid=${item.id}>${item.name}</p>`);
            // });
            // this.setState({
            //     portalsList: arr
            // })
            this.setState({
                portalsList: data
            })
        });
    };

    toggleCPSelectorActive = (e) => {
        e.currentTarget.classList.toggle("active");
    };


    handleCorrect = async (e) => {
        e.preventDefault();
        if (this.state.name !== '') {
            this.setState({
                incorrect: false
            });
            const token = this.props.token.token !== undefined ? this.props.token.token : localStorage.getItem('token');
            var query;
            if (this.state.id !== '') {
                query = updateHotspotById(token, this.state.name, this.state.address, this.state.description, this.state.id);
            }
            else {
                query = createHotspot(token, this.state.name, this.state.address, this.state.description, this.state.id);
            }

            await query.then(res => {
                this.props.token.token !== undefined ? this.getHotspotsMethodHandler(this.props.token.token) : this.getHotspotsMethodHandler(localStorage.getItem('token'));
            });

        } else {
            this.setState({
                incorrect: true
            });
        }
    };

    componentDidMount() {
        if (this.props.token.token !== undefined) {
            this.getHotspotsMethodHandler(this.props.token.token);
            this.getAllPortalsMethodHandler(this.props.token.token)
        } else {
            this.getHotspotsMethodHandler(localStorage.getItem('token'));
            this.getAllPortalsMethodHandler(localStorage.getItem('token'))
        }
    }

    editHandler = (id, name, address, description) => {
        const data = {id: id, name: name, address: address, description: description};
        Object.keys(data).map((el) => {
            this.setState({
                [el]: data[el]
            });
        });
    };

    setCPId(e) {
        document.getElementsByClassName('selectedPortal')[0].innerText =  e.currentTarget.innerText;
        this.setState({id: e.currentTarget.getAttribute('dataid') ? e.currentTarget.getAttribute('dataid') : ''});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.id !== nextState.id) return true;
        else if (this.state.name !== nextState.name) return true;
        else if (this.state.list !== nextState.list) return true;
        else if (this.state.address !== nextState.address) return true;
        else if (this.state.description !== nextState.description) return true;
        else if (this.state.portalsList !== nextState.portalsList) return true;
        else return true;
    }

    render() {
        console.log(this.state.portalsList);
        console.log(this.state.id);
        const {
            name,
            address,
            description
        } = this.state;
        return (
            <div className="hotspotDetailsWrap">
                <HotspotForm
                    incorrect={this.state.incorrect}
                    onCorrect={this.handleCorrect}>

                    <div>
                        <input
                            type="text"
                            datatype="name"
                            placeholder={"Your name"}
                            defaultValue={name}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            datatype="address"
                            placeholder={"Your address"}
                            defaultValue={address}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <textarea
                            datatype="description"
                            placeholder={"Your description"}
                            defaultValue={description}
                            onChange={this.handleInputChange}
                        >

                        </textarea>
                    </div>
                    <div className={"cpSelectorHead"}>
                        <div className="cpSelector" onClick={this.toggleCPSelectorActive}>
                            <p className={'selectedPortal'}>Select Captive Portal</p>
                            <div className="list">
                                <p onClick={(e) => this.setCPId(e)}>Set nothing</p>
                                {this.state.portalsList !== '' && this.state.portalsList.map((item, i) => {
                                    return <p onClick={(e) => this.setCPId(e)} key={i} dataid={item.id}>{item.name}</p>
                                })}
                                {/*<p>Portal Name</p>*/}
                            </div>
                        </div>
                    </div>
                </HotspotForm>
                <HotspotTable
                    hotspotList={this.state.list !== '' ? this.state.list : false}
                    editHandler={this.editHandler}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        token: state.token
    }),
    dispatch => ({})
)(HotspotDetails);
