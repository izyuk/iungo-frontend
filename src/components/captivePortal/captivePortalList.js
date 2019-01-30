import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllPortals} from "../../api/API";
import Loader from "../../loader";
import {Redirect} from "react-router-dom";

class CaptivePortalList extends Component {
    state = {
        list: '',
        cleared: false
    };

    getId = (e) => {
        this.props.setId(e.currentTarget.getAttribute('dataid'))
    };

    findAllPortals = async (data) => {
        let query = getAllPortals(data);
        let listArray = [];
        await query.then(res => {
            let {data} = res;
            data.map((item, i) => {
                listArray.push(
                    <tr key={i} dataid={item.id} onClick={this.getId}>
                        <td className={"CaptivePortalItem"}>{item.name}</td>
                        <td>{item.externalStylesUrl}</td>
                    </tr>
                )

            });
        });
        this.setState({
            list: listArray
        })

    };

    addNewCP = async () => {
        const INITIAL = {
            background_and_logo: {
                logo: {
                    url: '',
                    position: 'center'
                },
                background: {
                    url: '',
                    color: {
                        rgba: {
                            r: 229,
                            g: 233,
                            b: 242,
                            a: 1,
                        },
                        hex: '#e5e9f2'
                    },
                    type: ''
                }
            },
            container_border: {
                color: {
                    rgba: {
                        r: 229,
                        g: 233,
                        b: 242,
                        a: 1,
                    },
                    hex: '#e5e9f2'
                },
                type: 'solid',
                thickness: 1,
                radius: 4
            },
            container_background: {
                color: {
                    rgba: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 1,
                    },
                    hex: '#ffffff'
                },
                opacity: 100
            },
            container_size: {
                width: 720,
                padding: 20
            },
            header: {
                top: {
                    text: 'Company name',
                    styles: {
                        color: {
                            rgba: {
                                r: 85,
                                g: 133,
                                b: 237,
                                a: 1,
                            },
                            hex: '#5585ed'
                        },
                        fontSize: 18,
                        textActions: {
                            bold: false,
                            italic: false,
                            underline: false
                        },
                        alignment: 'center'
                    }
                },
                description: {
                    text: 'Venue description',
                    styles: {
                        color: {
                            rgba: {
                                r: 85,
                                g: 133,
                                b: 237,
                                a: 1,
                            },
                            hex: '#5585ed'
                        },
                        fontSize: 18,
                        textActions: {
                            bold: false,
                            italic: false,
                            underline: false
                        },
                        alignment: 'center'
                    }
                }
            },
            login_methods: {
                methods: {
                    google: false,
                    facebook: false,
                    twitter: false
                }
            },
            footer: {
                text: 'Footer content',
                styles: {
                    color: {
                        rgba: {
                            r: 85,
                            g: 133,
                            b: 237,
                            a: 1,
                        },
                        hex: '#5585ed'
                    },
                    fontSize: 18,
                    textActions: {
                        bold: false,
                        italic: false,
                        underline: false
                    },
                    alignment: 'center'
                }
            },
            css: {
                path: ''
            },
            imagesIDs: {
                logoID: '',
                backgroundID: ''
            },
        };
        await this.props.reset(INITIAL);

        this.props.clearing();



        console.log(this.props.tabName);
    };

    componentDidMount() {
        this.props.token.token ? this.findAllPortals(this.props.token.token) : this.findAllPortals(localStorage.getItem('token'));
        console.log(this.props.tabName);
        console.log('store\n');
    }

    render() {
        return (
            this.state.cleared ? <Redirect to='/captive-portal'/> :
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Captive Portals List</h3>
                        <button type="button" className={"addNewCPButton"}
                                onClick={this.addNewCP}>Add new Captive Portal
                        </button>
                    </div>
                    <table className={"captivePortalList"} rules="rows">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>External Styles</th>
                        </tr>
                        </thead>
                        <tbody>{this.state.list !== '' && this.state.list}</tbody>
                    </table>
                    {this.state.list === '' && <Loader/>}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        token: state.token,
        tabName: state
    }),
    dispatch => ({
        reset: (data) => {
            dispatch({type: "RESET_APP", payload: data});
        }
    })
)(CaptivePortalList);
