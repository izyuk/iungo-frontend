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
            cy.get('.email')
                .find('input')
                .focus()
                .type('dummy.email@gmail.com');
            cy.get('.password')
                .find('input')
                .focus()
                .type('12345678');
            cy.get('.login')
                .click();
        });

        it('Filling login inputs with correct data', () => {
            cy.visit('http://localhost:9000');
            cy.get('.email > input')
                .focus()
                .type('dmitriy.izyuk@gmail.com');
            cy.get('.password > input')
                .focus()
                .type('Izyuk8968');
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
            cy.get('[data-cy="captivePortalName"]')
                .focus()
                .clear()
                .type('CP TEST NAME')
                .blur
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
            cy.get('[data-cy="openColorPicker"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('303338')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
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
            cy.get('[ data-cy="borderColor"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('ff6900')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
            cy.get('[data-cy="thickness"]')
                .select('3');
            cy.get('[data-cy="radius"]')
                .select('2');
        });
        it('Background', () => {
            cy.get('[data-cy="containerBackground"')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('5c4040')
                .blur();
            cy.get('.flexbox-fix:nth-child(3) > div').last()
                .find('input')
                .focus()
                .clear()
                .type('0')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
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
            cy.get('[data-cy="headerTopBold"]')
                .click();
            cy.get('[data-cy="headerTopItalic"]')
                .click();
            cy.get('[data-cy="headerTopUnderline"]')
                .click();
        });

        it('Remove all top text font styles', () => {
            cy.get('[data-cy="headerTopBold"]')
                .click();
            cy.get('[data-cy="headerTopItalic"]')
                .click();
            cy.get('[data-cy="headerTopUnderline"]')
                .click();
        });

        it('Check all top text alignments', () => {
            cy.get('[data-cy="headerTopLeft"]')
                .check({force: true});
            cy.get('[data-cy="headerTopCenter"]')
                .check({force: true});
            cy.get('[data-cy="headerTopRight"]')
                .check({force: true});
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="headerTopCenter"]')
                .check({force: true});
        });

        it('Enter top text', () => {
            cy.get('[data-cy="headerTopText"]')
                .focus()
                .clear()
                .type('CP TEST HEADER TEXT')
                .blur();
        });

        it('Set top text color', () => {
            cy.get('[ data-cy="headerTopColor"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('edaa55')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
        });

        it('Add all description text font styles', () => {
            cy.get('[data-cy="headerDescriptionBold"]')
                .click();
            cy.get('[data-cy="headerDescriptionItalic"]')
                .click();
            cy.get('[data-cy="headerDescriptionUnderline"]')
                .click();
        });

        it('Remove all description text font styles', () => {
            cy.get('[data-cy="headerDescriptionBold"]')
                .click();
            cy.get('[data-cy="headerDescriptionItalic"]')
                .click();
            cy.get('[data-cy="headerDescriptionUnderline"]')
                .click();
        });

        it('Check all description text alignments', () => {
            cy.get('[data-cy="headerDescriptionLeft"]')
                .check({force: true});
            cy.get('[data-cy="headerDescriptionCenter"]')
                .check({force: true});
            cy.get('[data-cy="headerDescriptionRight"]')
                .check({force: true});
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="headerDescriptionCenter"]')
                .check({force: true});
        });

        it('Enter description text', () => {
            cy.get('[data-cy="headerDescriptionText"]')
                .focus()
                .clear()
                .type('CP TEST DESCRIPTION TEXT')
                .blur();
        });

        it('Set description text color', () => {
            cy.get('[data-cy="headerDescriptionColor"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('edaa55')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
        });

        it('Set description text font size', () => {
            cy.get('[data-cy="headerDescriptionFontSize"]')
                .focus()
                .clear()
                .type(23)
                .blur();
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
            cy.get('[data-cy="connectButtonBold"]')
                .click();
            cy.get('[data-cy="connectButtonItalic"]')
                .click();
            cy.get('[data-cy="connectButtonUnderline"]')
                .click();
        });

        it('Remove all connect button font styles', () => {
            cy.get('[data-cy="connectButtonBold"]')
                .click();
            cy.get('[data-cy="connectButtonItalic"]')
                .click();
            cy.get('[data-cy="connectButtonUnderline"]')
                .click();
        });

        it('Check all connect button alignments', () => {
            cy.get('[data-cy="connectButtonLeft"]')
                .check({force: true});
            cy.get('[data-cy="connectButtonCenter"]')
                .check({force: true});
            cy.get('[data-cy="connectButtonRight"]')
                .check({force: true});
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="connectButtonCenter"]')
                .check({force: true});
        });

        it('Enter connect button text', () => {
            cy.get('[data-cy="connectButtonText"]')
                .focus()
                .clear()
                .type('Connect FOR FREE')
                .blur();
        });

        it('Set connect button text color', () => {
            cy.get('[ data-cy="connectButtonTextColor"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('edaa55')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
        });

        it('Set connect button background color', () => {
            cy.get('[data-cy="connectButtonBackgroundColor"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('ffffff')
                .blur();
            cy.get('.flexbox-fix:nth-child(3) > div').last()
                .find('input')
                .focus()
                .clear()
                .type('0')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
        });

        it('Set connect button border color', () => {
            cy.get('[data-cy="connectButtonBorderColor"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('5585ed')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
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
            cy.get('[data-cy="connectButtonWidth"]')
                .focus()
                .clear()
                .type(320)
                .blur();
            cy.get('[data-cy="connectButtonPadding"]')
                .focus()
                .clear()
                .type(10)
                .blur();
        });
    });

    describe('Footer drop-down', () => {
        it('Open drop-down', () => {
            cy.get('[data-cy="dropDownFooter"]')
                .click()
        });

        it('Add all footer text font styles', () => {
            cy.get('[data-cy="footerTopBold"]')
                .click();
            cy.get('[data-cy="footerTopBold"]')
                .click();
            cy.get('[data-cy="footerTopBold"]')
                .click();
        });

        it('Remove all footer text font styles', () => {
            cy.get('[data-cy="footerTopBold"]')
                .click();
            cy.get('[data-cy="footerTopBold"]')
                .click();
            cy.get('[data-cy="footerTopBold"]')
                .click();
        });

        it('Check all footer text alignments', () => {
            cy.get('[data-cy="footerTopLeft"]')
                .check({force: true});
            cy.get('[data-cy="footerTopCenter"]')
                .check({force: true});
            cy.get('[data-cy="footerTopRight"]')
                .check({force: true});
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="footerTopCenter"]')
                .check({force: true});
        });

        it('Enter footer text', () => {
            cy.get('[data-cy="footerText"]')
                .focus()
                .clear()
                .type('TEST FOOTER TEXT')
                .blur();
        });

        it('Set footer text color', () => {
            cy.get('[ data-cy="footerTextColor"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('edaa55')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
        });
    });

    describe('Success actions drop-down', () => {
        it('Open drop-down', () => {
            cy.get('[data-cy="dropDownSuccessActions"]')
                .click()
        });

        it('Add all success text font styles', () => {
            cy.get('[data-cy="successTextBold"]')
                .click();
            cy.get('[data-cy="successTextItalic"]')
                .click();
            cy.get('[data-cy="successTextUnderline"]')
                .click();
        });

        it('Remove all success text font styles', () => {
            cy.get('[data-cy="successTextBold"]')
                .click();
            cy.get('[data-cy="successTextItalic"]')
                .click();
            cy.get('[data-cy="successTextUnderline"]')
                .click();
        });

        it('Check all success text alignments', () => {
            cy.get('[data-cy="successTextLeft"]')
                .check({force: true});
            cy.get('[data-cy="successTextCenter"]')
                .check({force: true});
            cy.get('[data-cy="successTextRight"]')
                .check({force: true});
        });

        it('Choose alignment we need', () => {
            cy.get('[data-cy="successTextCenter"]')
                .check({force: true});
        });

        it('Enter success text', () => {
            cy.get('[data-cy="successText"]')
                .focus()
                .clear()
                .type('CP TEST SOME SUCCESS MESSAGE TEXT')
                .blur();
        });

        it('Set success text color', () => {
            cy.get('[ data-cy="successTextColor"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div').first()
                .find('input')
                .focus()
                .clear()
                .type('edaa55')
                .blur();
            cy.get('.colorWrap > div > div').first()
                .click();
        });

        it('Enter success page redurect URL', () => {
            cy.get('[data-cy="successPageRedirect"]')
                .focus()
                .clear()
                .type('http://google.com')
                .blur();
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
        })
    });
});
