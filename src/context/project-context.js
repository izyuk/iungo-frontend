import React from 'react';
import { getCaptivePortalDefault, getDataToExcludeDefault } from '~/context/CaptivePortalDefault';

export default React.createContext({
    ...getCaptivePortalDefault(),
    dataToExclude: getDataToExcludeDefault(),
    addPortalName: () => {},
    setBackground: () => {},
    setBackgroundRepeating: () => {},
    setBackgroundPosition: () => {},
    // setBackgroundAttachment: () => {},
    setBackgroundSize: () => {},
    setLogo: () => {},
    setBorderStyle: () => {},
    setBackgroundStyle: () => {},
    setSizeStyle: () => {},
    setContainerVerticalPosition: () => {},
    setHeaderTopData: () => {},
    setHeaderDescriptionData: () => {},
    setLoginMethods: () => {},
    setFooterData: () => {},
    setLogoID: () => {},
    setBackgroundID: () => {},
    setCSS: () => {},
    redirectURLChanger: () => {},
    setButtonStyles: () => {},
    setSuccessMessageData: () => {},
    setExternalCssInfo: () => {},
    setGDPRSettings: () => {},
    setGDPRSettingsStatus: () => {},
    setGDPRCollection: () => {},
    loaderHandler: () => {},
    setSuccessMessageStatus: () => {},
    setNotification: () => {},
    resetGlobalState: () => {},
    setToken: () => {},
    previewCssGenerator: () => {},
    removeLogo: () => {},
    removeBackground: () => {},
    urlPathHandler: () => {},
    profileHandler: () => {},
    setTermsFromBE: () => {},
    setFontsCollection: () => {},
    setFontData: () => {},
    setFontBase64: () => {},
    setLocaleData: () => {},
    setActiveLocale: () => {},
    setTranslations: () => {},
    clearTranslations: () => {},
    setPreviewDeviceType: () => {},
    setDeviceTypeSettingsTouched: () => {},
    checkDeviceTypeDataChanged: () => {},
    setActiveSettingsPath: () => {},
});