import React, {Component} from 'react';

import CaptivePortalContext from "~/context/project-context";
import Icons from '~/static/images/icons';


class LanguagesModal extends Component {
    static contextType = CaptivePortalContext;

    onModalClose(){
        if (this.props.onClose) { this.props.onClose(); }
    }

    onLanguageChange(lang){
        this.context.setActiveLocale(lang);
        this.onModalClose();
    }

    render() {
        const languages = this.context.translationsLanguages || [];
        const currentLanguage = this.context.dataToExclude.activeLocale || '';
        return (
            <div className="languagesModalOverlay" onClick={() => this.onModalClose()} data-cy="languagesModalPreviewOverlay">
                <div className="languagesModal" onClick={e => e.stopPropagation()}>
                    <div className="languagesModalClose" onClick={() => this.onModalClose()} data-cy="languagesModalPreviewClose">
                        <Icons.ModalClose/>
                    </div>
                    <img className="languagesModalLogo" src={require('~/static/images/logo-icon.png')} alt=""/>
                    <p className="languagesModalTitle">Choose your language</p>

                    <div className="languagesModalList">
                        {languages.map((languageItem, i) => {
                            const langShort = this.context.convertLocaleName(languageItem, true);
                            const active = Boolean(currentLanguage === languageItem);
                            const Icon = Icons[`Flag${langShort}`];
                            return (
                                <div key={i} className={`languagesModalItem ${active ? 'active' : ''}`}
                                    data-cy="languagesModalPreviewItem"
                                    data-lang={languageItem}
                                    onClick={() => this.onLanguageChange(languageItem)}>
                                    <div className="languagesModalFlag">
                                        {Icon && <Icon/>}
                                    </div>
                                    <p>{languageItem}</p>
                                </div>
                            )
                        })}
                    </div>
                        
                    <div className="languagesModalCloseButton" onClick={() => this.onModalClose()}>
                        Close
                    </div>
                </div>
            </div>
        )
    }
}

export default LanguagesModal;
