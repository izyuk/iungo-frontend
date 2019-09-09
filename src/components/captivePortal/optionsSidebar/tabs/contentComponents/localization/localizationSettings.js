import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';

class LocalozationSettings extends Component {

    static contextType = CaptivePortalContext;

    languageSelect = React.createRef();

    languageHandler = (e) => {
        const value = (e &&e.currentTarget.options[e.currentTarget.selectedIndex].value) || '';
        this.context.setActiveLocale(value);
    };

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
        const langShort = this.context.convertLocaleName(language);
        const LangIcon = Icons[`Flag${langShort}`];
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
                                        <span>{language} {LangIcon && <LangIcon/>}</span>
                                        <Icons.DropdownSvg/>
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