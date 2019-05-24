const INITIAL = {
    background: '',
    name: '',
    externalCss: '',
    logoId: '',
    backgroundId: '',
    header: 'Company name',
    description: 'Venue description',
    footer: 'Footer content',
    successMessage: 'Default success message',
    style: {
        header: {
            top: {
                color: {
                    rgba: {
                        r: 85,
                        g: 133,
                        b: 237,
                        a: 1,
                    },
                    hex: '#5585ed'
                },
                fontSize: 18,
                textActions: {
                    bold: false,
                    italic: false,
                    underline: false
                },
                alignment: 'center'
            },
            description: {
                color: {
                    rgba: {
                        r: 85,
                        g: 133,
                        b: 237,
                        a: 1,
                    },
                    hex: '#5585ed'
                },
                fontSize: 18,
                textActions: {
                    bold: false,
                    italic: false,
                    underline: false
                },
                alignment: 'center'
            },
        },
        footer: {
            color: {
                rgba: {
                    r: 85,
                    g: 133,
                    b: 237,
                    a: 1,
                },
                hex: '#5585ed'
            },
            fontSize: 18,
            textActions: {
                bold: false,
                italic: false,
                underline: false
            },
            alignment: 'center'
        },
        success_message: {
            color: {
                rgba: {
                    r: 85,
                    g: 133,
                    b: 237,
                    a: 1,
                },
                hex: '#5585ed'
            },
            fontSize: 18,
            textActions: {
                bold: false,
                italic: false,
                underline: false
            },
            alignment: 'center'
        },
        background_and_logo: {
            background: {
                url: '',
                color: {
                    rgba: {
                        r: 229,
                        g: 233,
                        b: 242,
                        a: 1,
                    },
                    hex: '#e5e9f2'
                },
                backgroundType: 'COLOR'
            },
            logo: {
                url: '',
                position: 'center',
            }
        },
        container_background: {
            color: {
                rgba: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 1,
                },
                hex: '#ffffff'
            },
            opacity: 100,
        },
        container_border: {
            color: {
                rgba: {
                    r: 229,
                    g: 233,
                    b: 242,
                    a: 1,
                },
                hex: '#e5e9f2'
            },
            type: 'solid',
            thickness: 1,
            radius: 4,
        },
        container_size: {
            width: 720,
            padding: 20
        },
        accept_button_font: {
            alignment: 'center',
            color: {
                hex: '#5585ed',
                rgba: {r: 85, g: 133, b: 237, a: 1}
            },
            fontSize: 18,
            textActions: {
                bold: false,
                italic: false,
                underline: false
            }
        },
        accept_button_color: {
            hex: "#ffffff",
            rgba: {r: 255, g: 255, b: 255, a: 1}
        },
        accept_button_size: {
            width: 145,
            padding: 10
        },
        accept_button_border: {
            color: {
                hex: '#5585ed',
                rgba: {r: 85, g: 133, b: 237, a: 1}
            },
            radius: 5,
            type: "solid",
            thickness: 1
        }
    },
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case "COLLECT_DATA":
            return Object.assign(state, action.payload);
        default:
            return state
    }
}
