import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Loader from "~/loader";
import {getAllPublicTemplates} from '~/api/API';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';

class CaptivePortalTemplates extends Component {
    static contextType = CaptivePortalContext;

    state = {
        templatesList: ''
    };

    token = localStorage.getItem('token');

    getAllTemplatesHandler = async () => {
        const query = getAllPublicTemplates(this.token);
        const currentState = this.state;
        await query.then(res => {
            currentState.templatesList = res.data;
            this.setState(currentState);
        })
    };

    addNewCP = async (id) => {
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (STYLE) STYLE.parentNode.removeChild(STYLE);
        this.context.resetGlobalState();
        localStorage.removeItem('cpID');
        localStorage.removeItem('templateID');
    };

    addNewCPWithTemplate = async (id) => {
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (STYLE) STYLE.parentNode.removeChild(STYLE);
        this.context.resetGlobalState();
        if(typeof id === "number") localStorage.setItem('templateID', id);
        localStorage.setItem('from', 'templates');
    };

    async componentDidMount() {
        this.context.setToken(this.token);
        await this.getAllTemplatesHandler();
        const STYLE = document.getElementsByTagName('STYLE')[0];
        if (STYLE) STYLE.parentNode.removeChild(STYLE);
        this.addNewCP();
        this.context.resetGlobalState();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (this.state.templatesList !== nextState.templatesList);
    }

    render() {
        const {templatesList} = this.state;
        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Templates</h3>
                    </div>

                    <div className="contentWrapWithTopBorder templates">
                        <div className="template">
                            <p>New</p>
                            <Icons.TemplateIcon />
                            <Link onClick={this.addNewCP} className={"addNewCPButton newTemplate"} to={`/captive-portals/new`}>Create
                                New</Link>
                        </div>
                        {
                            templatesList !== '' && templatesList.map((item, i) => {
                                return <div className="template" key={i}>
                                    <p>{item.name}</p>
                                    <img src={item.externalUrl} alt=""/>
                                    <Link onClick={() => this.addNewCPWithTemplate(item.id)} className={"addNewCPButton"}
                                          to={`/captive-portals/new`}>Use Template</Link>
                                </div>
                            })
                        }
                    </div>
                </div>
                {this.state.list === '' && <Loader/>}
            </div>
        )
    }
}

export default CaptivePortalTemplates;