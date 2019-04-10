export const GetBuilderParams = (storage) => {
    const {
        name: {name},
        css: {path},
        header: {top, description},
        footer,
        successMessage,
        background_and_logo: {background, logo},
        container_background,
        container_border,
        container_size,
        login_methods: {methods},
        imagesIDs,
        redirectURL: {url},
        loginAgreeButton: {acceptButtonBorder, acceptButtonColor, acceptButtonFont, acceptButtonSize, acceptButtonText}
    } = storage;
    const portalDataToSend = {
        background: background.type === 'COLOR' ? null : background.url,
        name: name && name,
        externalCss: path && path,
        logoId: imagesIDs.logoID,
        backgroundId: background.type === 'COLOR' ? null : imagesIDs.backgroundID,
        header: top.text,
        description: description.text,
        footer: footer.text,
        successMessage: successMessage.text,
        style: {
            header: {
                top: top.styles,
                description: description.styles,
            },
            footer: footer.styles,
            success_message: successMessage.styles,
            background_and_logo: {
                background: {
                    url: background.url,
                    color: background.color
                },
                logo: {
                    url: logo.url,
                    position: logo.position,
                }
            },
            container_background: {
                color: container_background.color,
                opacity: container_background.opacity !== null ? container_background.opacity : 100,
            },
            container_border: {
                color: container_border.color,
                type: container_border.type,
                thickness: container_border.thickness,
                radius: container_border.radius,
            },
            container_size: {
                width: container_size.width,
                padding: container_size.padding
            },
            accept_button_font: acceptButtonFont,
            accept_button_color: acceptButtonColor,
            accept_button_size: acceptButtonSize,
            accept_button_border: acceptButtonBorder
        },
        googleLogin: methods.google,
        facebookLogin: methods.facebook,
        twitterLogin: methods.twitter,
        acceptTermsLogin: methods.button,
        successRedirectUrl: url,
        acceptButtonText: acceptButtonText
    };

    return portalDataToSend;
};
