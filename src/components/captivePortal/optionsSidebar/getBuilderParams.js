export const GetBuilderParams = (storage) => {
    const portalDataToSend = JSON.parse( JSON.stringify(storage) );
    delete portalDataToSend.translationsLanguages;
    portalDataToSend.translations = [];
    storage.translationsLanguages.map(lang => {
        const translation = storage.translations[lang];
        if (translation) {
            portalDataToSend.translations.push({
                locale: lang,
                default: Boolean(translation.default),
                header: translation.name,
                description: translation.description,
                footer: translation.footer,
                acceptButtonText: translation.connectButtonText,
                successMessage: translation.successMessageText,
            })
        }
    });
    return portalDataToSend;
};