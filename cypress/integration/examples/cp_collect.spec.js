import {GetBuilderParams} from '../../../src/components/captivePortal/optionsSidebar/getBuilderParams';

function fillingFields(selector, text) {
    cy.get(selector)
        .focus()
        .clear()
        .type(text)
        .blur();
}

function fillingFieldsWithFindOption(selector, whatToFind, text) {
    cy.get(selector)
        .find(whatToFind)
        .focus()
        .type(text);
}

function fillColorHEX(selector, hex) {
    cy.get(selector)
        .click();
    cy.get('.flexbox-fix:nth-child(3) > div').first()
        .find('input')
        .focus()
        .clear()
        .type(hex)
        .blur();
    cy.get('.colorWrap > div > div').first()
        .click();
}

function fillColorHEXWithOpacity(selector, hex, opacity) {
    cy.get(selector)
        .click();
    cy.get('.flexbox-fix:nth-child(3) > div').first()
        .find('input')
        .focus()
        .clear()
        .type(hex)
        .blur();
    cy.get('.flexbox-fix:nth-child(3) > div').last()
        .find('input')
        .focus()
        .clear()
        .type(opacity)
        .blur();
    cy.get('.colorWrap > div > div').first()
        .click();
}

function fontStylingActions(selector1, selector2, selector3) {
    cy.get(selector1)
        .click();
    cy.get(selector2)
        .click();
    cy.get(selector3)
        .click();
}

function alignmentsActions(selector1, selector2, selector3) {
    cy.get(selector1)
        .check({force: true});
    cy.get(selector2)
        .check({force: true});
    cy.get(selector3)
        .check({force: true});
}

function setSomeSize(selector, value) {
    cy.get(selector)
        .focus()
        .clear()
        .type(value)
        .blur();
}



context('Start and going to CP', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });

    describe('Inputs login form (wrong creds)', function () {
        it('Checking reset route', () => {
            cy.visit('http://localhost:9000');
            cy.visit('http://localhost:9000/reset');
            cy.visit('http://localhost:9000');
        });
    });

    describe('Login form', () => {
        it('Filling login inputs with not valid data', () => {
            fillingFieldsWithFindOption('.email', 'input', 'dummy.email@gmail.com');
            fillingFieldsWithFindOption('.password', 'input', '12345678');
            cy.get('.login')
                .click();
        });

        it('Filling login inputs with correct data', () => {
            cy.visit('http://localhost:9000');
            fillingFieldsWithFindOption('.email', 'input', 'dmitriy.izyuk@gmail.com');
            fillingFieldsWithFindOption('.password', 'input', 'Izyuk8968');
            cy.get('.login')
                .click();
        });
    });

    describe('Login local storage', function () {
        it('Local storage user token & ID', () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            expect(token).to.not.equal('');
            expect(email).to.not.equal('');
        });
    });

    describe('NEW CP', function () {
        it('Creating', () => {
            cy.get('.addNewCPButton')
                .click()
        });

        it('Setting name', () => {
            fillingFields('[data-cy="captivePortalName"]', 'CP TEST NAME');
        });

        it('Device toggle', () => {
            cy.get('[data-id="mobile"] span')
                .click();
            cy.get('[data-id="desktop"] span')
                .click()
        });

    });
});

context('Style tab', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });
    describe('Changing background', function () {
        it('Setting color', () => {
            fillColorHEX('[data-cy="openColorPicker"]', '303338');
        });
    });


    describe('Changing logo', function () {
        it('Setting color', () => {
            cy.get('[data-cy="logoDropDown"]')
                .click();
        });

        it('Choosing and applying image', () => {
            cy.get('.upload')
                .click();
            cy.get('[dataid=203]')
                .click();
            cy.get('.close')
                .click();
        });

        it('Checking workability of all alignment options', () => {
            cy.get('[for=left]')
                .click();
            cy.get('[for=center]')
                .click();
            cy.get('[for=right]')
                .click();
        });

        it('Choosing alignment which wee need', () => {
            cy.get('[for=center]')
                .click();
        })
    });

    describe('Container', function () {
        it('Border', () => {
            cy.get('[data-cy="containerDropDown"]')
                .click();

            fillColorHEX('[data-cy="borderColor"]', 'ff6900');

            cy.get('[data-cy="thickness"]')
                .select('3');
            cy.get('[data-cy="radius"]')
                .select('2');
        });
        it('Background', () => {
            fillColorHEXWithOpacity('[data-cy="containerBackground"', '5c4040', '0');
        });
        it('Size', () => {
            cy.get('[data-cy="containerWidth"]')
                .focus()
                .type('1920')
                .blur();
        });
    });
});

context('Content tab', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });
    describe('Header drop-down', () => {
        it('Top text test', () => {
            cy.get('[data-cy="contentTab"]')
                .click();
        });

        it('Add all top text font styles', () => {
            fontStylingActions('[data-cy="headerTopBold"]', '[data-cy="headerTopItalic"]', '[data-cy="headerTopUnderline"]');
        });

        it('Remove all top text font styles', () => {
            fontStylingActions('[data-cy="headerTopBold"]', '[data-cy="headerTopItalic"]', '[data-cy="headerTopUnderline"]');
        });

        it('Check all top text alignments', () => {
            alignmentsActions('[data-cy="headerTopLeft"]', '[data-cy="headerTopCenter"]', '[data-cy="headerTopRight"]');
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="headerTopCenter"]')
                .check({force: true});
        });

        it('Enter top text', () => {
            fillingFields('[data-cy="headerTopText"]', 'CP TEST HEADER TEXT');
        });

        it('Set top text color', () => {
            fillColorHEX('[ data-cy="headerTopColor"]', 'edaa55');
        });

        it('Add all description text font styles', () => {
            fontStylingActions('[data-cy="headerDescriptionBold"]', '[data-cy="headerDescriptionItalic"]', '[data-cy="headerDescriptionUnderline"]');
        });

        it('Remove all description text font styles', () => {
            fontStylingActions('[data-cy="headerDescriptionBold"]', '[data-cy="headerDescriptionItalic"]', '[data-cy="headerDescriptionUnderline"]');
        });

        it('Check all description text alignments', () => {
            alignmentsActions('[data-cy="headerDescriptionLeft"]', '[data-cy="headerDescriptionCenter"]', '[data-cy="headerDescriptionRight"]');
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="headerDescriptionCenter"]')
                .check({force: true});
        });

        it('Enter description text', () => {
            fillingFields('[data-cy="headerDescriptionText"]', 'CP TEST DESCRIPTION TEXT');
        });

        it('Set description text color', () => {
            fillColorHEX('[ data-cy="headerDescriptionColor"]', 'edaa55');
        });

        it('Set description text font size', () => {
            setSomeSize('[data-cy="headerDescriptionFontSize"]', 23);
        })
    });

    describe('Login methods drop-down', () => {
        it('Choosing needed method(s)', () => {
            cy.get('[data-cy="dropDownLoginMethods"]')
                .click();
        });

        it('Select all', () => {
            cy.get('[data-cy="loginMethodFacebook"]')
                .click();
            cy.get('[data-cy="loginMethodGoogle"]')
                .click();
            cy.get('[data-cy="loginMethodConnectButton"]')
                .click();
        });

        it('Remove all', () => {
            cy.get('[data-cy="loginMethodFacebook"]')
                .click();
            cy.get('[data-cy="loginMethodGoogle"]')
                .click();
            cy.get('[data-cy="loginMethodConnectButton"]')
                .click();
        });

        it('Selecting needed methods', () => {
            cy.get('[data-cy="loginMethodFacebook"]')
                .click();
            cy.get('[data-cy="loginMethodGoogle"]')
                .click();
            cy.get('[data-cy="loginMethodConnectButton"]')
                .click();
        });
    });

    describe('Connect button settings', () => {
        it('Add all connect button font styles', () => {
            fontStylingActions('[data-cy="connectButtonBold"]', '[data-cy="connectButtonItalic"]', '[data-cy="connectButtonUnderline"]');
        });

        it('Remove all connect button font styles', () => {
            fontStylingActions('[data-cy="connectButtonBold"]', '[data-cy="connectButtonItalic"]', '[data-cy="connectButtonUnderline"]');
        });

        it('Check all connect button alignments', () => {
            alignmentsActions('[data-cy="connectButtonLeft"]', '[data-cy="connectButtonCenter"]', '[data-cy="connectButtonRight"]');
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="connectButtonCenter"]')
                .check({force: true});
        });

        it('Enter connect button text', () => {
            fillingFields('[data-cy="connectButtonText"]', 'Connect FOR FREE');
        });

        it('Set connect button text color', () => {
            fillColorHEX('[ data-cy="connectButtonTextColor"]', 'edaa55');
        });

        it('Set connect button background color', () => {
            fillColorHEXWithOpacity('[data-cy="connectButtonBackgroundColor"]', 'ffffff', '0');
        });

        it('Set connect button border color', () => {
            fillColorHEX('[ data-cy="connectButtonBorderColor"]', '5585ed');
        });

        it('Set connect button border thickness', () => {
            cy.get('[data-cy="connectButtonBorderThickness"]')
                .select('1');
        });

        it('Set connect button border radius', () => {
            cy.get('[data-cy="connectButtonBorderRadius"]')
                .select('5');
        });

        it('Set connect button size', () => {
            setSomeSize('[data-cy="connectButtonWidth"]', 320);
            setSomeSize('[data-cy="connectButtonPadding"]', 10);
        });
    });

    describe('Footer drop-down', () => {
        it('Open drop-down', () => {
            cy.get('[data-cy="dropDownFooter"]')
                .click()
        });

        it('Add all footer text font styles', () => {
            fontStylingActions('[data-cy="footerTopBold"]', '[data-cy="footerTopItalic"]', '[data-cy="footerTopUnderline"]');
        });

        it('Remove all footer text font styles', () => {
            fontStylingActions('[data-cy="footerTopBold"]', '[data-cy="footerTopItalic"]', '[data-cy="footerTopUnderline"]');
        });

        it('Check all footer text alignments', () => {
            alignmentsActions('[data-cy="footerTopLeft"]', '[data-cy="footerTopCenter"]', '[data-cy="footerTopRight"]');
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="footerTopCenter"]')
                .check({force: true});
        });

        it('Enter footer text', () => {
            fillingFields('[data-cy="footerText"]', 'TEST FOOTER TEXT');
        });

        it('Set footer text color', () => {
            fillColorHEX('[ data-cy="footerTextColor"]', 'edaa55');
        });
    });

    describe('Success actions drop-down', () => {
        it('Open drop-down', () => {
            cy.get('[data-cy="dropDownSuccessActions"]')
                .click()
        });

        it('Add all success text font styles', () => {
            fontStylingActions('[data-cy="successTextBold"]', '[data-cy="successTextItalic"]', '[data-cy="successTextUnderline"]');
        });

        it('Remove all success text font styles', () => {
            fontStylingActions('[data-cy="successTextBold"]', '[data-cy="successTextItalic"]', '[data-cy="successTextUnderline"]');
        });

        it('Check all success text alignments', () => {
            alignmentsActions('[data-cy="successTextLeft"]', '[data-cy="successTextCenter"]', '[data-cy="successTextRight"]');
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="successTextCenter"]')
                .check({force: true});
        });

        it('Enter success text', () => {
            fillingFields('[data-cy="successText"]', 'CP TEST SOME SUCCESS MESSAGE TEXT');
        });

        it('Set success text color', () => {
            fillColorHEX('[ data-cy="successTextColor"]', 'edaa55');
        });

        it('Enter success page redurect URL', () => {
            fillingFields('[data-cy="successPageRedirect"]', 'http://google.com');
        });
    });

});

context('Settings tab', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });
    describe('Style tab', () => {
        it('Style tab', () => {
            cy.get('[data-cy="settingsTab"]')
                .click();
        })
    })
});

context('Tests finished', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });

    describe('Going back to the style tab', () => {
        it('Style tab', () => {
            cy.get('[data-cy="styleTab"]')
                .click();
        })
    })
});

context('Starting comparing collected data', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });

    describe('Unit test for data collecting', function () {
        it('Has expected state on CP building finish', () => {
            cy.url().should('include', '/captive-portals/new').then(() => {
                cy.window().then(win => {
                    const store = Object.assign({}, win.__store__);
                    expect(store).to.deep.equal(
                        {
                            background_and_logo: {
                                logo: {
                                    url: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/4.jpg",
                                    position: "center"
                                },
                                backgroundType: "COLOR",
                                background: {
                                    url: "",
                                    color: {rgba: {r: 48, g: 51, b: 56, a: 1}, hex: "#303338"},
                                    type: "COLOR"
                                }
                            },
                            tabName: [],
                            container_border: {
                                color: {rgba: {r: 255, g: 105, b: 0, a: 1}, hex: "#ff6900"},
                                type: "solid",
                                thickness: "3",
                                radius: "2"
                            },
                            container_background: {
                                color: {rgba: {r: 92, g: 64, b: 64, a: 0}, hex: "#5c4040"},
                                opacity: 100
                            },
                            container_size: {width: 1920, padding: 20},
                            header: {
                                top: {
                                    text: "CP TEST HEADER TEXT",
                                    styles: {
                                        color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
                                        alignment: "center",
                                        fontSize: 18,
                                        textActions: {bold: false, italic: false, underline: false}
                                    }
                                },
                                description: {
                                    text: "CP TEST DESCRIPTION TEXT",
                                    styles: {
                                        color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
                                        alignment: "center",
                                        fontSize: 23,
                                        textActions: {bold: false, italic: false, underline: false}
                                    }
                                }
                            },
                            login_methods: {methods: {facebook: true, google: true, twitter: false, button: true}},
                            footer: {
                                text: "TEST FOOTER TEXT",
                                styles: {
                                    color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
                                    alignment: "center",
                                    fontSize: 18,
                                    textActions: {bold: false, italic: false, underline: false}
                                }
                            },
                            successMessage: {
                                text: "CP TEST SOME SUCCESS MESSAGE TEXT",
                                styles: {
                                    color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
                                    alignment: "center",
                                    fontSize: 18,
                                    textActions: {bold: false, italic: false, underline: false}
                                }
                            },
                            token: {token: store.token.token},
                            name: {name: "CP TEST NAME"},
                            css: {path: ""},
                            redirectURL: {url: "http://google.com"},
                            imagesIDs: {logoID: "203", backgroundID: ""},
                            loginAgreeButton: {
                                acceptButtonText: "Connect FOR FREE",
                                acceptButtonColor: {rgba: {r: 255, g: 255, b: 255, a: 0}, hex: "#ffffff"},
                                acceptButtonFont: {
                                    color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
                                    alignment: "center",
                                    fontSize: 18,
                                    textActions: {bold: false, italic: false, underline: false}
                                },
                                acceptButtonSize: {padding: 10, width: 320},
                                acceptButtonBorder: {
                                    color: {rgba: {r: 85, g: 133, b: 237, a: 1}, hex: "#5585ed"},
                                    radius: 5,
                                    thickness: 1,
                                    type: "solid"
                                }
                            }
                        }
                    )
                })
            });
        });
        it('Testing object for sending', () => {
            cy.url().should('include', '/captive-portals/new').then(() => {
                cy.window().then(win => {
                    const store = GetBuilderParams(Object.assign({}, win.__store__));
                    expect(store).to.deep.equal(
                        {
                            background: null,
                            name: "CP TEST NAME",
                            externalCss: "",
                            logoId: "203",
                            backgroundId: null,
                            header: "CP TEST HEADER TEXT",
                            description: "CP TEST DESCRIPTION TEXT",
                            footer: "TEST FOOTER TEXT",
                            successMessage: "CP TEST SOME SUCCESS MESSAGE TEXT",
                            style: {
                                header: {
                                    top: {
                                        color: {
                                            rgba: {
                                                r: 237,
                                                g: 170,
                                                b: 85,
                                                a: 1
                                            },
                                            hex: "#edaa55"
                                        },
                                        fontSize: 18,
                                        textActions: {
                                            bold: false,
                                            italic: false,
                                            underline: false
                                        },
                                        alignment: "center"
                                    },
                                    description: {
                                        color: {
                                            rgba: {
                                                r: 237,
                                                g: 170,
                                                b: 85,
                                                a: 1
                                            },
                                            hex: "#edaa55"
                                        },
                                        fontSize: 23,
                                        textActions: {
                                            bold: false,
                                            italic: false,
                                            underline: false
                                        },
                                        alignment: "center"
                                    }
                                },
                                footer: {
                                    color: {
                                        rgba: {
                                            r: 237,
                                            g: 170,
                                            b: 85,
                                            a: 1
                                        },
                                        hex: "#edaa55"
                                    },
                                    fontSize: 18,
                                    textActions: {
                                        bold: false,
                                        italic: false,
                                        underline: false
                                    },
                                    alignment: "center"
                                },
                                success_message: {
                                    color: {
                                        rgba: {
                                            r: 237,
                                            g: 170,
                                            b: 85,
                                            a: 1
                                        },
                                        hex: "#edaa55"
                                    },
                                    fontSize: 18,
                                    textActions: {
                                        bold: false,
                                        italic: false,
                                        underline: false
                                    },
                                    alignment: "center"
                                },
                                background_and_logo: {
                                    background: {
                                        url: "",
                                        color: {
                                            hex: "#303338",
                                            rgba: {
                                                r: 48,
                                                g: 51,
                                                b: 56,
                                                a: 1
                                            }
                                        }
                                    },
                                    logo: {
                                        url: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/4.jpg",
                                        position: "center"
                                    }
                                },
                                container_background: {
                                    color: {
                                        rgba: {
                                            r: 92,
                                            g: 64,
                                            b: 64,
                                            a: 0
                                        },
                                        hex: "#5c4040"
                                    },
                                    opacity: 100
                                },
                                container_border: {
                                    color: {
                                        rgba: {
                                            r: 255,
                                            g: 105,
                                            b: 0,
                                            a: 1
                                        },
                                        hex: "#ff6900"
                                    },
                                    type: "solid",
                                    thickness: "3",
                                    radius: "2"
                                },
                                container_size: {
                                    width: 1920,
                                    padding: 20
                                },
                                accept_button_font: {
                                    alignment: "center",
                                    color: {
                                        hex: "#edaa55",
                                        rgba: {
                                            r: 237,
                                            g: 170,
                                            b: 85,
                                            a: 1
                                        }
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
                                    rgba: {
                                        r: 255,
                                        g: 255,
                                        b: 255,
                                        a: 0
                                    }
                                },
                                accept_button_size: {
                                    width: 320,
                                    padding: 10
                                },
                                accept_button_border: {
                                    color: {
                                        hex: "#5585ed",
                                        rgba: {
                                            r: 85,
                                            g: 133,
                                            b: 237,
                                            a: 1
                                        }
                                    },
                                    radius: 5,
                                    type: "solid",
                                    thickness: 1
                                }
                            },
                            googleLogin: true,
                            facebookLogin: true,
                            twitterLogin: false,
                            acceptTermsLogin: true,
                            successRedirectUrl: "http://google.com",
                            acceptButtonText: "Connect FOR FREE"
                        }
                    )
                })
            });
        })
    });
});
