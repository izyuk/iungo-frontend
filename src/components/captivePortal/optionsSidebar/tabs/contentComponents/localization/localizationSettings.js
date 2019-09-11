import React, {Component} from 'react';
import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';
import MultiSelect from "@khanacademy/react-multi-select";

class LocalozationSettings extends Component {

    static contextType = CaptivePortalContext;

    onTextChange = (e) => {
        const val = e.currentTarget.value;
        const name = e.currentTarget.getAttribute('name');
        const activeLocale = this.context.dataToExclude.activeLocale || null;
        this.context.setTranslations(activeLocale, { [name]: val });
    };

    handleSelectedChanged(selected){
        if (selected.length) {
            this.context.translationsLanguages.map(lang => {
                if (selected.indexOf(lang) === -1) {
                    this.context.setTranslations(lang, {}, true);
                }
            });
            selected.map(lang => {
                if (this.context.translationsLanguages.indexOf(lang) === -1) {
                    this.context.setTranslations(lang, {});
                }
            });
        } else {
            this.context.setNotification('At least one language should be chosen', true, 'info');
            setTimeout(() => {
                this.context.setNotification('', false, false);
            }, 3000);
        }
    }

    render() {
        const language = this.context.dataToExclude.activeLocale || null;
        const languages = this.context.dataToExclude.locales || [];
        const translationsLanguages = this.context.translationsLanguages;
        const translation = this.context.translations[language] || {};
        const langShort = this.context.convertLocaleName(language);
        const LangIcon = Icons[`Flag${langShort}`];
        const multiSelectOptions = [];
        languages.map(item => multiSelectOptions.push({ label: item, value: item }));
        return (
            <div className="container active">
                <div className="row">
                    <div className="logoLeft">
                        <span className="fieldLabel">
                            Languages
                        </span>
                    </div>
                    <div className="right">
                        <div className="innerRow">
                            <div className="innerCol">
                                <div className="innerRow">
                                    <MultiSelect
                                        options={multiSelectOptions}
                                        selected={translationsLanguages}
                                        valueRenderer={(selected) => selected.join(', ')}
                                        disableSearch={true}
                                        onSelectedChanged={this.handleSelectedChanged.bind(this)}
                                        hasSelectAll={false}
                                        overrideStrings={{
                                            selectSomeItems: 'Select Languages',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row langTabs">
                    {translationsLanguages.map((languageItem, i) => (
                        <div key={i}
                            className={'langTab ' + (language === languageItem ? 'langTabActive' : '')}
                            onClick={() => this.context.setActiveLocale(languageItem)}
                        >
                            {languageItem || 'Language'}
                        </div>
                    ))}
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