import React from 'react';

export default {
    FlagLT: () => (
        <svg version="1.1" id="FlagLT" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 512 512" enableackground="new 0 0 512 512">
            <rect y="85.337" fill="#6DA544" width="512" height="341.326"/>
            <rect y="85.337" fill="#FFDA44" width="512" height="113.775"/>
            <rect y="312.888" fill="#D80027" width="512" height="113.775"/>
        </svg>
    ),
    FlagEN: () => (
        <svg version="1.1" id="FlagEN" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 512 512" enableackground="new 0 0 512 512">
            <rect y="85.333" fill="#F0F0F0" width="512" height="341.337"/>
            <polygon fill="#D80027" points="288,85.33 224,85.33 224,223.996 0,223.996 0,287.996 224,287.996 224,426.662 288,426.662 
                288,287.996 512,287.996 512,223.996 288,223.996 "/>
            <g>
                <polygon fill="#0052B4" points="393.785,315.358 512,381.034 512,315.358"/>
                <polygon fill="#0052B4" points="311.652,315.358 512,426.662 512,395.188 368.307,315.358"/>
                <polygon fill="#0052B4" points="458.634,426.662 311.652,344.998 311.652,426.662"/>
            </g>
            <polygon fill="#F0F0F0" points="311.652,315.358 512,426.662 512,395.188 368.307,315.358"/>
            <polygon fill="#D80027" points="311.652,315.358 512,426.662 512,395.188 368.307,315.358"/>
            <g>
                <polygon fill="#0052B4" points="90.341,315.356 0,365.546 0,315.356"/>
                <polygon fill="#0052B4" points="200.348,329.51 200.348,426.661 25.491,426.661"/>
            </g>
            <polygon fill="#D80027" points="143.693,315.358 0,395.188 0,426.662 0,426.662 200.348,315.358"/>
            <g>
                <polygon fill="#0052B4" points="118.215,196.634 0,130.958 0,196.634"/>
                <polygon fill="#0052B4" points="200.348,196.634 0,85.33 0,116.804 143.693,196.634"/>
                <polygon fill="#0052B4" points="53.366,85.33 200.348,166.994 200.348,85.33"/>
            </g>
            <polygon fill="#F0F0F0" points="200.348,196.634 0,85.33 0,116.804 143.693,196.634"/>
            <polygon fill="#D80027" points="200.348,196.634 0,85.33 0,116.804 143.693,196.634"/>
            <g>
                <polygon fill="#0052B4" points="421.659,196.636 512,146.446 512,196.636"/>
                <polygon fill="#0052B4" points="311.652,182.482 311.652,85.331 486.509,85.331"/>
            </g>
            <polygon fill="#D80027" points="368.307,196.634 512,116.804 512,85.33 512,85.33 311.652,196.634"/>
        </svg>
    ),
    FlagRU: () => (
        <svg version="1.1" id="FlagRU" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 512.001 512.001" enableackground="new 0 0 512.001 512.001">
            <path fill="#F5F5F5" d="M512,200.093H0V97.104c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828
                L512,200.093L512,200.093z"/>
            <path fill="#FF4B55" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V311.909h512v102.988
                C512,419.773,508.047,423.725,503.172,423.725z"/>
            <rect y="200.091" fill="#41479B" width="512" height="111.81"/>
        </svg>
    ),
    
    ModalClose: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 62 62" enableackground="new 0 0 62 62">
            <path fill={props.fill || "#E2E2E2"} fillRule="evenodd" d="M42.674 30.709L59.655 47.69a8.016 8.016 0 0 1-11.337 11.336l-16.98-16.981-17.6 17.6A8.05 8.05 0 0 1 2.355 48.263l17.6-17.601L2.974 13.681A8.016 8.016 0 0 1 14.31 2.345l16.981 16.981L47.885 2.732a8.05 8.05 0 0 1 11.383 11.383L42.674 30.709z"/>
        </svg>
    ),

    DropdownIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill={props.fill || "#BFC5D2"} fillRule="nonzero"
            d="M12 15.6l-4.7-4.7 1.4-1.5 3.3 3.3 3.3-3.3 1.4 1.5z"/>
        </svg>
    ),

    UploadIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill={props.fill || "#FFF"} fillRule="nonzero" d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM13 14v3h-2v-3H8l4-4 4 4h-3z"/>
        </svg>
    ),

    CheckIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="CheckIcon" x="0px" y="0px" width="512px"
             height="512px" viewBox="0 0 442.533 442.533" enableBackground='new 0 0 442.533 442.533'>
            <g>
                <path d="M434.539,98.499l-38.828-38.828c-5.324-5.328-11.799-7.993-19.41-7.993c-7.618,0-14.093,2.665-19.417,7.993L169.59,247.248   l-83.939-84.225c-5.33-5.33-11.801-7.992-19.412-7.992c-7.616,0-14.087,2.662-19.417,7.992L7.994,201.852   C2.664,207.181,0,213.654,0,221.269c0,7.609,2.664,14.088,7.994,19.416l103.351,103.349l38.831,38.828   c5.327,5.332,11.8,7.994,19.414,7.994c7.611,0,14.084-2.669,19.414-7.994l38.83-38.828L434.539,137.33   c5.325-5.33,7.994-11.802,7.994-19.417C442.537,110.302,439.864,103.829,434.539,98.499z"
                    fill={props.fill || "#FFF"}/>
            </g>
        </svg>
    ),

    CheckSquareIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill={props.fill || "#FFF"} d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z"/>
        </svg>
    ),

    TemplateIcon: (props = {}) => (
        <svg version="1.1" id="TemplateIcon" x="0px" y="0px" viewBox="0 0 58 58" style={{enableBackground: 'new 0 0 58 58'}} 
             width={props.width || "230px"} height={props.height || "230px"}>
            <g><g>
                <path d="M57,6H1C0.448,6,0,6.447,0,7v44c0,0.553,0.448,1,1,1h56c0.552,0,1-0.447,1-1V7C58,6.447,57.552,6,57,6z M56,50H2V8h54V50z"
                    data-original="#000000" className="active-path" data-old_color="#000000"
                    fill={props.fill || "#768197"}/>
                <path d="M16,28.138c3.071,0,5.569-2.498,5.569-5.568C21.569,19.498,19.071,17,16,17s-5.569,2.498-5.569,5.569   C10.431,25.64,12.929,28.138,16,28.138z M16,19c1.968,0,3.569,1.602,3.569,3.569S17.968,26.138,16,26.138s-3.569-1.601-3.569-3.568   S14.032,19,16,19z"
                    data-original="#000000" className="active-path" data-old_color="#000000"
                    fill={props.fill || "#768197"}/>
                <path d="M7,46c0.234,0,0.47-0.082,0.66-0.249l16.313-14.362l10.302,10.301c0.391,0.391,1.023,0.391,1.414,0s0.391-1.023,0-1.414   l-4.807-4.807l9.181-10.054l11.261,10.323c0.407,0.373,1.04,0.345,1.413-0.062c0.373-0.407,0.346-1.04-0.062-1.413l-12-11   c-0.196-0.179-0.457-0.268-0.72-0.262c-0.265,0.012-0.515,0.129-0.694,0.325l-9.794,10.727l-4.743-4.743   c-0.374-0.373-0.972-0.392-1.368-0.044L6.339,44.249c-0.415,0.365-0.455,0.997-0.09,1.412C6.447,45.886,6.723,46,7,46z"
                    data-original="#000000" className="active-path" data-old_color="#000000"
                    fill={props.fill || "#768197"}/>
            </g></g>
        </svg>
    ),

    DesktopDeviceIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill={props.fill || "#BFC6D3"} fillRule="nonzero" d="M17.25 6H6.75C6.3 6 6 6.3 6 6.75V14c0 .45.3 1 .75 1H11v2H9v1h6v-1h-2v-2h4.25c.45 0 .75-.55.75-1V6.75c0-.45-.3-.75-.75-.75zM16 8v5H8V8h8z"/>
        </svg>
    ),

    MobileDeviceIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill={props.fill || "#AFB7C8"} fillRule="nonzero" d="M15.5 6h-6C8.673 6 8 6.673 8 7.5v9c0 .827.673 1.5 1.5 1.5h6c.827 0 1.5-.673 1.5-1.5v-9c0-.827-.673-1.5-1.5-1.5zm-3 10.375a.625.625 0 1 1 0-1.25.625.625 0 0 1 0 1.25zM15 14h-5V8h5v6z" />
        </svg>
    ),

    CaptivePortalIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill={props.fill || "#BFC5D2"} fillRule="nonzero" d="M16 4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 11H9v-2h6v2zm0-4H9V9h6v2z"/>
        </svg>
    ),

    HotspotsIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" enableBackground="new 0 0 26 26" width="512px" height="512px">
            <g fill={props.fill || "#BFC5D2"} fillRule="nonzero">
                <path d="M25.7,8.3C22.4,5,18,3,13,3S3.5,5,0.3,8.3C0.1,8.5,0,8.7,0,9c0,0.3,0.1,0.5,0.3,0.7l1.4,1.4c0.4,0.4,1,0.4,1.4,0   C5.6,8.6,9.1,7,13,7s7.4,1.6,9.9,4.1c0.4,0.4,1,0.4,1.4,0l1.4-1.4C25.9,9.5,26,9.3,26,9S25.9,8.4,25.7,8.3z"/>
                <path d="m13,11c-2.8,0-5.2,1.1-7,2.9-0.4,0.4-0.4,1 0,1.4l1.4,1.4c0.4,0.4 1,0.4 1.4,0 1.1-1.1 2.6-1.7 4.2-1.7 1.6,0 3.1,0.7 4.2,1.7 0.4,0.4 1,0.4 1.4,0l1.4-1.4c0.4-0.4 0.4-1 0-1.4-1.8-1.8-4.2-2.9-7-2.9z"/>
                <circle cx="13" cy="21" r="2"/>
            </g>
        </svg>
    ),

    ReportsIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill={props.fill || "#BFC5D2"} fillRule="nonzero">
                <path d="M12 4l-5 6h3v9c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-9h3l-5-6zM7 15H5c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1z"/>
                <path d="M19 12h-2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1z"/>
            </g>
        </svg>
    ),

    SettingsIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-4 -4 24 24">
            <g fill={props.fill || "#BFC5D2"} fillRule="nonzero">
                <path d="M13.3,5.2 L14.4,3.1 L13,1.7 L10.9,2.8 C10.6,2.6 10.2,2.5 9.8,2.4 L9,0 L7,0 L6.2,2.3 C5.9,2.4 5.5,2.5 5.2,2.7 L3.1,1.6 L1.6,3.1 L2.7,5.2 C2.5,5.5 2.4,5.9 2.3,6.2 L0,7 L0,9 L2.3,9.8 C2.4,10.2 2.6,10.5 2.7,10.9 L1.6,13 L3,14.4 L5.1,13.3 C5.4,13.5 5.8,13.6 6.2,13.7 L7,16 L9,16 L9.8,13.7 C10.2,13.6 10.5,13.4 10.9,13.3 L13,14.4 L14.4,13 L13.3,10.9 C13.5,10.6 13.6,10.2 13.7,9.8 L16,9 L16,7 L13.7,6.2 C13.6,5.9 13.5,5.5 13.3,5.2 Z M8,11 C6.3,11 5,9.7 5,8 C5,6.3 6.3,5 8,5 C9.7,5 11,6.3 11,8 C11,9.7 9.7,11 8,11 Z" id="Shape"></path>
            </g>
        </svg>
    ),

    MenuIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill={props.fill || "#BFC5D2"} fillRule="nonzero">
                <path d="M19 11H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1zM19 5H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1zM19 17H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1z"/>
            </g>
        </svg>
    ),

    AvatarIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="53" height="67" viewBox="0 0 53 67">
            <g fill="none" fillRule="evenodd">
                <path fill="#5282F0" d="M53 67v-5.675C53 46.847 41.075 35 26.5 35S0 46.847 0 61.325V67h53z"/>
                <path fill="#FFF" d="M18 42V30l12 6z"/>
                <path fill="#FFF" d="M37 42V30l-12 6z"/>
                <path fill="#BFC5D3" d="M44 17c0 9.389-7.611 17-17 17s-17-7.611-17-17S17.611 0 27 0s17 7.611 17 17"/>
                <path fill="#082265" d="M10 14.393a22.03 22.03 0 0 0 5.131.607C24.06 15 31.721 9.684 35 2.106A17.087 17.087 0 0 0 26.754 0C18.17 0 11.086 6.272 10 14.393"/>
                <path fill="#BFC5D3" d="M46 22a4 4 0 1 1-8 0 4 4 0 0 1 8 0M16 22a4 4 0 1 1-8 0 4 4 0 0 1 8 0"/>
                <path stroke="#FFF" strokeWidth=".75" d="M42 60H31V49h11zM31 53h11"/>
                <path fill="#082265" d="M24 .34C25.071 8.059 31.64 14 39.59 14c1.53 0 3.01-.225 4.41-.636C42.275 5.713 35.493 0 27.384 0c-1.159 0-2.29.118-3.384.34"/>
            </g>
        </svg>
    ),

    ClipboardCopyIcon: (props = {}) => (
        <svg version="1.1" id="ClipboardCopyIcon" x="0px" y="0px" viewBox="0 0 488.3 488.3" style={{enableBackground: 'new 0 0 488.3 488.3'}} width="20px" height="20px">
            <g fill={props.fill || "#5585ED"}>
                <path d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124    C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124    c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"
                    className="active-path"/>
                <path d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227    c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6    V38.6C439.65,17.3,422.35,0,401.05,0z"
                    className="active-path"/>
            </g>
        </svg>
    ),

    FacebookIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill={props.fill || "#FFF"} fillRule="nonzero" d="M15.3 0H.7C.3 0 0 .3 0 .7v14.7c0 .3.3.6.7.6H8v-5H6V8h2V6c0-2.1 1.2-3 3-3h2v3h-1c-.6 0-1 .4-1 1v1h2.6l-.6 3h-2v5h4.3c.4 0 .7-.3.7-.7V.7c0-.4-.3-.7-.7-.7z"/>
        </svg>
    ),

    GoogleIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
            <path fill={props.fill || "#FFF"} fillRule="nonzero" d="M7 6v2.4h4.1c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C10.6.7 9 0 7.1 0c-3.9 0-7 3.1-7 7s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7z"/>
        </svg>
    ),

    TwitterIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
            <path fill={props.fill || "#FFF"} fillRule="nonzero" d="M16 2c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1C9.3.5 7.8 2 7.8 3.8c0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 6.7 1.8 8 3.3 8.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 3.3 15.6 2.7 16 2z"/>
        </svg>
    ),

    PhoneIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill={props.fill || "#8D98B0"} fillRule="nonzero" d="M15.285 12.305l-2.578-2.594a1 1 0 0 0-1.416-.002L9 12 4 7l2.294-2.294a1 1 0 0 0 .001-1.414L3.715.708a1 1 0 0 0-1.415 0L.004 3.003 0 3c0 7.18 5.82 13 13 13l2.283-2.283a1 1 0 0 0 .002-1.412z"/>
        </svg>
    ),

    EmailIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14">
            <g fill={props.fill || "#8D98B0"} fillRule="nonzero">
                <path d="M15 0H1C.4 0 0 .4 0 1v1.4l8 4.5 8-4.4V1c0-.6-.4-1-1-1z"/>
                <path d="M7.5 8.9L0 4.7V13c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4.7L8.5 8.9c-.28.14-.72.14-1 0z"/>
            </g>
        </svg>
    ),

    KeyIcon: (props = {}) => (
        <svg enableBackground="new 0 0 128 128" height="16" id="KeyIcon" version="1.1" viewBox="0 0 128 128" width="16">
            <path fill={props.fill || "#8D98B0"} d="M116,8c0.617,0,1.809,0.156,2.828,1.172C119.848,10.195,120,11.383,120,12s-0.152,1.805-1.172,2.828  l-4.484,4.484L112,21.656v3.313V40h-8h-8v8v8h-8h-8v8v8h-0.805h-9.781l1.941,9.586C71.781,83.703,72,85.859,72,88  c0,17.648-14.355,32-32,32S8,105.648,8,88s14.355-32,32-32c4.957,0,9.891,1.266,14.664,3.758l5.207,2.719l4.152-4.156l49.148-49.148  C114.191,8.156,115.383,8,116,8 M40,104c8.824,0,16-7.18,16-16s-7.176-16-16-16s-16,7.18-16,16S31.176,104,40,104 M116,0  c-3.07,0-6.141,1.172-8.484,3.516L58.367,52.664C52.844,49.781,46.66,48,40,48C17.91,48,0,65.906,0,88s17.91,40,40,40  s40-17.906,40-40c0-2.742-0.281-5.414-0.805-8H88V64h16V48h16V24.969l4.484-4.484c4.688-4.688,4.688-12.281,0-16.969  C122.141,1.172,119.07,0,116,0L116,0z M40,96c-4.418,0-8-3.578-8-8s3.582-8,8-8s8,3.578,8,8S44.418,96,40,96L40,96z" />
        </svg>
    ),

    Logo: (props = {}) => (
        <svg version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="155.905px" height="37.095px" viewBox="0 0 155.905 37.095" enableBackground="new 0 0 155.905 37.095">
            <path fill={props.fill || "#3675DE"} d="M109.525,14.583c0.917,0.528,1.232,1.702,0.702,2.62L99.303,36.138c-0.529,0.914-1.705,1.229-2.621,0.701 c-0.915-0.528-1.229-1.706-0.7-2.62l3.978-6.895l-5.844-10.121c-0.53-0.918-0.215-2.092,0.701-2.62 c0.915-0.531,2.091-0.216,2.621,0.701l4.735,8.205l4.732-8.205C107.435,14.367,108.609,14.052,109.525,14.583 M80.884,21.784 c0-4.53-3.688-8.219-8.22-8.219c-4.534,0-8.222,3.688-8.222,8.219c0,4.536,3.688,8.223,8.222,8.223 C77.196,30.007,80.884,26.32,80.884,21.784 M77.079,21.784c0,2.436-1.981,4.418-4.415,4.418c-2.436,0-4.417-1.982-4.417-4.418 c0-2.433,1.981-4.414,4.417-4.414C75.098,17.37,77.079,19.352,77.079,21.784 M37.602,13.565c4.533,0,8.221,3.687,8.221,8.222 v5.537c0,1.057-0.862,1.919-1.917,1.919c-0.628,0-1.183-0.309-1.532-0.776c-1.347,0.967-2.992,1.54-4.771,1.54 c-4.533,0-8.222-3.687-8.222-8.22C29.38,17.252,33.069,13.565,37.602,13.565 M37.602,26.202c2.434,0,4.416-1.982,4.416-4.415 c0-2.437-1.982-4.417-4.416-4.417c-2.435,0-4.416,1.98-4.416,4.417C33.186,24.22,35.167,26.202,37.602,26.202 M8.221,13.565 c4.532,0,8.222,3.687,8.222,8.219c0,4.534-3.69,8.223-8.222,8.223C3.688,30.007,0,26.318,0,21.784V7.708 C0,6.65,0.86,5.789,1.917,5.789c1.058,0,1.917,0.861,1.917,1.919v7.135C5.108,14.037,6.608,13.565,8.221,13.565 M8.221,26.202 c2.436,0,4.417-1.981,4.417-4.418c0-2.434-1.982-4.414-4.417-4.414c-2.435,0-4.417,1.98-4.417,4.414 C3.804,24.221,5.786,26.202,8.221,26.202 M22.663,21.784c0-2.433,1.951-4.414,4.386-4.414c1.049,0,1.901-0.854,1.901-1.901 c0-1.052-0.852-1.904-1.901-1.904c-4.532,0-8.222,3.688-8.222,8.223v5.537c0,1.057,0.86,1.919,1.917,1.919 c1.058,0,1.918-0.862,1.918-1.919V21.784z M92.289,4.573c-4.533,0-8.222,3.688-8.222,8.221v1.532 c-1.058,0-1.922,0.857-1.922,1.918c0,1.057,0.864,1.918,1.922,1.918v9.162c0,1.057,0.857,1.919,1.917,1.919 c1.058,0,1.918-0.862,1.918-1.919v-9.162h2.467c1.058,0,1.92-0.861,1.92-1.918c0-1.061-0.862-1.918-1.92-1.918h-2.467v-1.532 c0-2.435,1.951-4.416,4.387-4.416c1.047,0,1.902-0.852,1.902-1.902C94.191,5.428,93.336,4.573,92.289,4.573 M62.491,14.583 c-0.918-0.531-2.09-0.216-2.621,0.701l-4.739,8.208l-4.739-8.208c-0.528-0.917-1.704-1.232-2.62-0.701 c-0.916,0.528-1.23,1.702-0.701,2.62c0,0,4.76,8.244,6.396,11.079c0.323,0.561,0.957,0.961,1.663,0.96 c0.663,0,1.311-0.346,1.664-0.96c1.601-2.768,6.398-11.079,6.398-11.079C63.722,16.285,63.409,15.111,62.491,14.583"/>
            <g>
                <path fill={props.fill || "#3675DE"} d="M155.905,17.649c0-9.747-7.898-17.648-17.646-17.649c-9.746-0.001-17.648,7.9-17.649,17.647 c-0.002,9.747,7.901,17.647,17.646,17.649C148.005,35.297,155.905,27.396,155.905,17.649"/>
                <path fill="#FFFFFF" d="M147.839,20.12c-0.209-1.028-1.214-1.697-2.24-1.491c-0.988,0.195-1.713,1.157-1.48,2.296 c0.569,2.783-1.611,5.28-4.331,5.28c-2.438,0-4.419-1.982-4.419-4.418c0.002-2.436,1.982-4.414,4.419-4.414 c0.927,0,1.789,0.28,2.497,0.774c0.859,0.603,2.044,0.4,2.65-0.452c0.583-0.822,0.455-2.024-0.5-2.684 c-1.994-1.377-4.271-1.654-6.147-1.305c0.792-1.122,2.093-1.857,3.569-1.857c1.044,0,1.898-0.851,1.9-1.895 c0-1.045-0.854-1.899-1.9-1.899c-2.616,0-4.953,1.233-6.455,3.151V7.709c0-1.057-0.86-1.919-1.918-1.919 c-1.057,0-1.917,0.862-1.917,1.918v6.906l-0.751-1.596c-0.447-0.956-1.591-1.368-2.546-0.917 c-0.953,0.449-1.363,1.592-0.914,2.543c0,0,3.49,7.479,4.899,10.436c2.063,4.338,5.863,4.929,7.532,4.929 C144.798,30.009,148.916,25.42,147.839,20.12z"/>
            </g>
        </svg>
    ),

    ExportDownloadIcon: (props = {}) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill={props.fill || "#BFC5D2"} fillRule="nonzero" d="M17 11.1V11c0-2.8-2.2-5-5-5-2.5 0-4.6 1.8-4.9 4.3-1.8.6-3.1 2.2-3.1 4.2C4 17 6 19 8.5 19H16c2.2 0 4-1.8 4-4 0-1.9-1.3-3.4-3-3.9zM11 13v-3h2v3h3l-4 4-4-4h3z"/>
        </svg>
    ),
}
