import React, {Component} from 'react';
import {getAllPortals} from "../../api/API";
import {dateISO} from '../../modules/dateISO';
import Loader from "../../loader";
import {Link, Redirect, Route} from "react-router-dom";
import CaptivePortalContext from "../../context/project-context";

class CaptivePortalList extends Component {

    static contextType = CaptivePortalContext;

    state = {
        list: '',
        cleared: false
    };

    getId = (e) => {
        this.props.setId(e.currentTarget.getAttribute('dataid'));
    };

    findAllPortals = async (data) => {
        let query = getAllPortals(data);
        let listArray = [];
        await query.then(res => {
            let {data} = res;
            data.map((item, i) => {
                listArray.push(
                    <Route key={i} render={({history}) => (
                        <tr dataid={item.id} datauuid={item.uuid} onClick={(e) => {
                            this.getId(e);
                            history.push(`/captive-portals/${item.uuid}`)
                        }}>
                            <td className={"CaptivePortalItem"}>{item.name}</td>
                            <td>{dateISO(item.createdAt)}</td>
                            <td>{dateISO(item.updatedAt)}</td>
                        </tr>
                    )}/>
                )
            });
        });
        this.setState({
            list: listArray
        })
    };

    addNewCP = async () => {
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (STYLE) STYLE.parentNode.removeChild(STYLE);
        this.context.resetGlobalState();
        localStorage.removeItem('cpID');
    };

    componentDidMount() {
        console.log('TOKEN: ', localStorage.getItem('token'));
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (STYLE) STYLE.parentNode.removeChild(STYLE);
        this.findAllPortals(localStorage.getItem('token'));
        this.addNewCP();
        this.context.resetGlobalState();
        console.log(this.context);
    }

    render() {
        return (
            this.state.cleared ? <Redirect to='/captive-portal'/> :
                <div className="container containerFix">
                    <div className="wrap wrapFix2">
                        <div className="info">
                            <h3>Captive Portals List</h3>
                            {/*<Link onClick={this.addNewCP} className={"addNewCPButton"} to={`/captive-portals/new`}>Get started</Link>*/}
                            <Link className={"addNewCPButton"} to={`/captive-portals/templates`}>Get started</Link>
                        </div>
                        <table className={"captivePortalList"} rules="rows">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Created</th>
                                <th>Updated</th>
                            </tr>
                            </thead>
                            <tbody>{this.state.list !== '' && this.state.list}</tbody>
                        </table>
                    </div>
                    {this.state.list === '' && <Loader/>}
                </div>
        )
    }
}

export default CaptivePortalList;
