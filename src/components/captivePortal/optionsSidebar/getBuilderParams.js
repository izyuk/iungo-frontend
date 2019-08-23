export const GetBuilderParams = (storage) => {
    const portalDataToSend = storage;
    if (!portalDataToSend.style.background_and_logo.mobileBackground) {
        portalDataToSend.style.background_and_logo.mobileBackground = Object.assign({}, portalDataToSend.style.background_and_logo.desktopBackground);
    }
    return portalDataToSend;
};