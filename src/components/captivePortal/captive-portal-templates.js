import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Loader from "../../loader";
import {getAllPublicTemplates} from '../../api/API';
import CaptivePortalContext from "../../context/project-context";

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
        if(typeof id === "number") localStorage.setItem('templateID', id);
        localStorage.setItem('from', 'templates');
    };

    async componentDidMount() {
        this.context.setToken(this.token);
        console.log('CP TEMPLATES TOKEN', this.token);
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
        console.log(templatesList);
        return (
            <div className="container containerFix">
                <div className="wrap wrapFix2">
                    <div className="info">
                        <h3>Templates</h3>
                    </div>

                    <div className="contentWrapWithTopBorder templates">
                        <div className="template">
                            <p>New</p>
                            <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 58 58"
                                 style={{enableBackground: 'new 0 0 58 58'}} width="230px"
                                 height="230px">
                                <g>
                                    <g>
                                        <path
                                            d="M57,6H1C0.448,6,0,6.447,0,7v44c0,0.553,0.448,1,1,1h56c0.552,0,1-0.447,1-1V7C58,6.447,57.552,6,57,6z M56,50H2V8h54V50z"
                                            data-original="#000000" className="active-path" data-old_color="#000000"
                                            fill="#768197"/>
                                        <path
                                            d="M16,28.138c3.071,0,5.569-2.498,5.569-5.568C21.569,19.498,19.071,17,16,17s-5.569,2.498-5.569,5.569   C10.431,25.64,12.929,28.138,16,28.138z M16,19c1.968,0,3.569,1.602,3.569,3.569S17.968,26.138,16,26.138s-3.569-1.601-3.569-3.568   S14.032,19,16,19z"
                                            data-original="#000000" className="active-path" data-old_color="#000000"
                                            fill="#768197"/>
                                        <path
                                            d="M7,46c0.234,0,0.47-0.082,0.66-0.249l16.313-14.362l10.302,10.301c0.391,0.391,1.023,0.391,1.414,0s0.391-1.023,0-1.414   l-4.807-4.807l9.181-10.054l11.261,10.323c0.407,0.373,1.04,0.345,1.413-0.062c0.373-0.407,0.346-1.04-0.062-1.413l-12-11   c-0.196-0.179-0.457-0.268-0.72-0.262c-0.265,0.012-0.515,0.129-0.694,0.325l-9.794,10.727l-4.743-4.743   c-0.374-0.373-0.972-0.392-1.368-0.044L6.339,44.249c-0.415,0.365-0.455,0.997-0.09,1.412C6.447,45.886,6.723,46,7,46z"
                                            data-original="#000000" className="active-path" data-old_color="#000000"
                                            fill="#768197"/>
                                    </g>
                                </g>
                            </svg>
                            <Link onClick={this.addNewCP} className={"addNewCPButton newTemplate"} to={`/captive-portals/new`}>Create
                                New</Link>
                        </div>
                        {
                            templatesList !== '' && templatesList.map((item, i) => {
                                return <div className="template" key={i}>
                                    <p>{item.name}</p>
                                    <img src={item.externalUrl} alt=""/>
                                    <Link onClick={() => this.addNewCP(item.id)} className={"addNewCPButton"}
                                          to={`/captive-portals/${item.uuid}`}>Use Template</Link>
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