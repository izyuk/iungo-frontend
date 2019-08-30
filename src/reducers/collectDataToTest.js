
import Palette from '../static/styles/palette';

const INITIAL = {
    background: '',
    name: '',
    externalCss: '',
    desktopLogoId: '',
    mobileLogoId: '',
    desktopBackgroundId: '',
    mobileBackgroundId: '',
    header: 'Company name',
    description: 'Venue description',
    footer: 'Footer content',
    successMessage: 'Default success message',
    style: {
        header: {
            top: {
                color: Palette.getColor('BLUE'),
                fontSize: 18,
                textActions: {
                    bold: false,
                    italic: false,
                    underline: false
                },
                alignment: 'center'
            },
            description: {
                color: Palette.getColor('BLUE'),
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
            color: Palette.getColor('BLUE'),
            fontSize: 18,
            textActions: {
                bold: false,
                italic: false,
                underline: false
            },
            alignment: 'center'
        },
        success_message: {
            color: Palette.getColor('BLUE'),
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
                color: Palette.getColor('PALE_GREY_THREE'),
                backgroundType: 'COLOR'
            },
            logo: {
                url: '',
                position: 'center',
            }
        },
        container_background: {
            color: Palette.getColor('WHITE'),
            opacity: 100,
        },
        container_border: {
            color: Palette.getColor('PALE_GREY_THREE'),
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
            color: Palette.getColor('BLUE'),
            fontSize: 18,
            textActions: {
                bold: false,
                italic: false,
                underline: false
            }
        },
        accept_button_color: Palette.getColor('WHITE'),
        accept_button_size: {
            width: 145,
            padding: 10
        },
        accept_button_border: {
            color: Palette.getColor('BLUE'),
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
