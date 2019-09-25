export const convertLocaleName = (locale, short) => {
    let localeName;
    const locales = [
        ['English', 'EN'],
        ['Lithuanian', 'LT'],
        ['Russian', 'RU']
    ];
    locales.map(item => {
        const index = item.indexOf(locale);
        if (index === 0 || index === 1) {
            localeName = Boolean(short) ? item[1] : item[0];
        }
    });
    return localeName || locale;
}

export const GetBuilderParams = (storage) => {
    const portalDataToSend = JSON.parse( JSON.stringify(storage) );
    delete portalDataToSend.translationsLanguages;
    portalDataToSend.translations = [];
    storage.translationsLanguages.map(lang => {
        const translation = storage.translations[lang];
        if (translation) {
            portalDataToSend.translations.push({
                locale: convertLocaleName(lang, true),
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