import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";

class LocalozationSettings extends Component {

    static contextType = CaptivePortalContext;

    languageSelect = React.createRef();

    languageHandler = (e) => {
        if (e) {
            const span = e.currentTarget.nextSibling.children[0];
            const value = e.currentTarget.options[e.currentTarget.selectedIndex].value
            span.innerText = value;
            this.context.setActiveLocale(value);
        } else {
            const svg = this.languageSelect.current.nextSibling.children[0];
            const span = document.createElement('span');
            span.innerText = this.languageSelect.current.options[this.languageSelect.current.selectedIndex].value;
            this.languageSelect.current.nextSibling.insertBefore(span, svg);
        }
    };

    async componentDidMount() {
        this.languageHandler();
    }

    onTextChange = (e) => {
        const val = e.currentTarget.value;
        const name = e.currentTarget.getAttribute('name');
        const activeLocale = this.context.dataToExclude.activeLocale || null;
        this.context.setTranslations(activeLocale, { [name]: val });
    };

    render() {
        const language = this.context.dataToExclude.activeLocale || null;
        const languages = this.context.dataToExclude.locales || [];
        const translation = this.context.translations[language] || {};
        return (
            <div className="container active">
                <div className="row">
                    <div className="logoLeft">
                        <span className="header">
                            Language
                        </span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div className="innerCol">
                                <div className="innerRow">
                                    <select ref={this.languageSelect}
                                            data-cy='languageSettings'
                                            onChange={this.languageHandler}
                                            value={language}
                                    >
                                        {
                                            languages.map((languageItem, i) => {
                                                return (<option key={i} value={languageItem}>{languageItem}</option>)
                                            })
                                        }
                                    </select>
                                    <p className="select">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24">
                                            <path fill="#BFC5D2" fillRule="nonzero"
                                                  d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
                                        </svg>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="fieldLabel">Header Top</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <textarea name='name'
                                      value={translation.name}
                                      onChange={this.onTextChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="fieldLabel">Description</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <textarea name='description'
                                      value={translation.description}
                                      onChange={this.onTextChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="fieldLabel">Footer</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <textarea name='footer'
                                      value={translation.footer}
                                      onChange={this.onTextChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="fieldLabel">Connect Button Text</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <textarea name='connectButtonText'
                                      value={translation.connectButtonText}
                                      onChange={this.onTextChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="logoLeft">
                        <span className="fieldLabel">Success Message</span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <textarea name='successMessageText'
                                      value={translation.successMessageText}
                                      onChange={this.onTextChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LocalozationSettings;