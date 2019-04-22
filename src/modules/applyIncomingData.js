import {getPortal} from "../api/API";

export const ApplyIncomingData = async (data, id) => {
    let query = getPortal(data, id);
    console.log('1');
    await query.then(res => {
        const {data} = res;
        console.log(data);
        this.props.setBackground(data.background !== null ? data.background.externalUrl : '', data.style.background_and_logo.background.color, data.style.background_and_logo.background.backgroundType);
        this.props.setLogo(data.logo !== null ? data.logo.externalUrl : '', data.style.background_and_logo.logo.position);
        this.props.setBorderStyle(data.style.container_border);
        this.props.setBackgroundStyle(data.style.container_background);
        this.props.setSizeStyle(data.style.container_size);
        this.props.setHedaerTopData(data.header, data.style.header.top);
        this.props.setHedaerDescriptionData(data.description, data.style.header.description);
        this.props.setLoginMethods({
            facebook: data.facebookLogin,
            google: data.googleLogin,
            twitter: data.twitterLogin,
            button: data.acceptTermsLogin
        });
        this.props.setFooterData(data.footer, data.style.footer);
        this.props.setLogoID(data.logo === null ? '' : data.logo.id);
        this.props.setBackgroundID(data.background === null ? '' : data.background.id);
        this.props.addPortalName(data.name);
        this.props.setCSS(data.externalCss);
        this.props.redirectURLChanger(data.successRedirectUrl);
        this.props.setSuccessMessageData(data.successMessage, data.style.success_message);
        this.props.setButtonStyles({
            acceptButtonText: data.acceptButtonText,
            acceptButtonSize: data.style.accept_button_size,
            acceptButtonColor: data.style.accept_button_color,
            acceptButtonFont: data.style.accept_button_font,
            acceptButtonBorder: data.style.accept_button_border
        });
        console.log(data.externalCss);
        const button = {};
        button.acceptButtonText = data.acceptButtonText;
        button.acceptButtonBorder = data.style.accept_button_border;
        button.acceptButtonColor = data.style.accept_button_color;
        button.acceptButtonFont = data.style.accept_button_font;
        button.acceptButtonSize = data.style.accept_button_size;
        this.setState({
            type: 'background',
            backgroundType: data.style.background_and_logo.background.backgroundType,
            backgrName: data.background !== null ? data.background.externalUrl : data.style.background_and_logo.background.color,
            logoName: data.logo !== null ? data.logo.externalUrl : '',
            alignment: data.style.background_and_logo.logo.position,
            container: {
                border: data.style.container_border,
                background: data.style.container_background,
                size: data.style.container_size
            },
            acceptButton: button,
            headerText: {
                top: data.header,
                descr: data.description
            },
            methods: {
                facebook: data.facebookLogin,
                google: data.googleLogin,
                twitter: data.twitterLogin,
                button: data.acceptTermsLogin
            },
            successData: data.successMessage || '',
            footerContent: data.footer,
            loader: false,
            portalName: data.name,
            readyToWork: true,
            externalCss: data.externalCss
        });
        this.portalName.current.value = data.name;
    });
};