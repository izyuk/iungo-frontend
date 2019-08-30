const APPLICATION_HOST = Cypress.env('APPLICATION_HOST') || 'http://localhost:9000';
const LOGIN_EMAIL = Cypress.env('LOGIN_EMAIL') || 'dmitriy.izyuk@gmail.com';
const LOGIN_PASSWORD = Cypress.env('LOGIN_PASSWORD') || 'Izyuk8968';

const loadedDataForExpectedStore = {
    desktopBackgroundId: "331",
    desktopBackgroundUrl: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/nasa-53884-unsplash.jpg",
    mobileBackgroundId: "331",
    mobileBackgroundUrl: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/nasa-53884-unsplash.jpg",
    desktopLogoId: "330",
    desktopLogoUrl: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/google_logo.svg",
    mobileLogoId: "330",
    mobileLogoUrl: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/google_logo.svg",
};

function clearFields(selector) {
    cy.get(selector)
        .focus()
        .clear({force: true})
        .blur({force: true});
}

function fillingFields(selector, text) {
    cy.get(selector)
        .focus()
        .clear({force: true})
        .type(text, {force: true})
        .blur({force: true});
}

function fillingFieldsWithFindOption(selector, whatToFind, text) {
    cy.get(selector)
        .find(whatToFind)
        .focus()
        .type(text);
}

function fillColorHEX(selector, hex) {
    cy.get(selector)
        .click({force: true});
    cy.get('.flexbox-fix:nth-child(3) > div').first()
        .find('input')
        .focus()
        .clear()
        .type(hex)
        .blur({force: true});
    cy.get('.colorWrap > div > div').first()
        .click({force: true});
}

function fillColorHEXWithOpacity(selector, hex, opacity) {
    cy.get(selector)
        .click({force: true});
    cy.get('.flexbox-fix:nth-child(3) > div').first()
        .find('input')
        .focus()
        .clear()
        .type(hex)
        .blur({force: true});
    cy.get('.flexbox-fix:nth-child(3) > div').last()
        .find('input')
        .focus()
        .clear()
        .type(opacity)
        .blur({force: true});
    cy.get('.colorWrap > div > div').first()
        .click({force: true});
}

function fontStylingActions(selector1, selector2, selector3) {
    cy.get(selector1)
        .click({force: true});
    cy.get(selector2)
        .click({force: true});
    cy.get(selector3)
        .click({force: true});
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
        .clear({force: true})
        .type(value, {force: true})
        .blur({force: true});
}


context('Start and going to CP', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });

    describe('Inputs login form (wrong creds)', function () {
        it('Checking reset route', () => {
            cy.visit(APPLICATION_HOST);
            cy.visit(`${APPLICATION_HOST}/reset`);
            cy.visit(APPLICATION_HOST);
        });
    });

    describe('Login form', () => {
        it('Filling login inputs with not valid data', () => {
            fillingFieldsWithFindOption('.email', 'input', 'dummy.email@gmail.com');
            fillingFieldsWithFindOption('.password', 'input', '12345678');
            cy.get('.login')
                .click({force: true});
        });

        it('Filling login inputs with correct data', () => {
            cy.visit(APPLICATION_HOST);
            fillingFieldsWithFindOption('.email', 'input', LOGIN_EMAIL);
            fillingFieldsWithFindOption('.password', 'input', LOGIN_PASSWORD);
            cy.get('.login')
                .click({force: true});
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


    describe('CP templates', function () {
        it('Going to CP templates', () => {
            cy.get('.addNewCPButton')
                .click({force: true})
        });

    });

    describe('NEW CP', function () {
        it('Creating new CP', () => {
            cy.get('.newTemplate')
                .click({force: true})
        });

        it('Setting name', () => {
            fillingFields('[data-cy="captivePortalName"]', 'CP TEST NAME');
        });

        it('Device toggle', () => {
            cy.get('[data-id="mobile"] span')
                .click({force: true});
            cy.get('[data-id="desktop"] span')
                .click({force: true})
        });
    });
});

context('Style tab', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });
    describe('Changing background desktop', function () {
        it('Choosing and applying image', () => {
            cy.get('.upload')
                .click({force: true});
            cy.get('[data-cy="backgroundImageItem0"')
                .dblclick({force: true}).then(elem => {
                const element = Cypress.$(elem);
                loadedDataForExpectedStore.desktopBackgroundId = element.attr('dataid');
                loadedDataForExpectedStore.desktopBackgroundUrl = element.attr('dataurl');
            });
        });
        it('Setting background repeating', () => {
            cy.get('[data-cy="backgroundRepeating"]')
                .select('no-repeat', {force: true});
        });
        it('Setting background position', () => {
            cy.get('[data-cy="backgroundPosition"]')
                .select('left top', {force: true});
        });
        it('Setting background size', () => {
            cy.get('[data-cy="backgroundSize"]')
                .select('custom-size', {force: true});
            fillingFields('[data-cy="backgroundWidth"', '50');
            fillingFields('[data-cy="backgroundHeight"', '50');
        });
    });

    describe('Changing background mobile', function () {
        it('Switch device type to mobile', () => {
            cy.get('[data-id="mobile"] span')
                .click({force: true});
        });
        it('Choosing and applying image', () => {
            cy.get('.upload')
                .click({force: true});
            cy.get('[data-cy="backgroundImageItem1"')
                .dblclick({force: true}).then(elem => {
                const element = Cypress.$(elem);
                loadedDataForExpectedStore.mobileBackgroundId = element.attr('dataid');
                loadedDataForExpectedStore.mobileBackgroundUrl = element.attr('dataurl');
            });
        });
        it('Setting background repeating', () => {
            cy.get('[data-cy="backgroundRepeating"]')
                .select('repeat-y', {force: true});
        });
        it('Setting background position', () => {
            cy.get('[data-cy="backgroundPosition"]')
                .select('center top', {force: true});
        });
        it('Setting background size', () => {
            cy.get('[data-cy="backgroundSize"]')
                .select('custom-size', {force: true});
            fillingFields('[data-cy="backgroundWidth"', '80');
            fillingFields('[data-cy="backgroundHeight"', '80');
        });
        it('Switch device type to desktop', () => {
            cy.get('[data-id="desktop"] span')
                .click({force: true})
        });
    });


    describe('Changing logo desktop', function () {
        it('Setting color', () => {
            cy.get('[data-cy="logoDropDown"]')
                .click({force: true});
        });

        it('Choosing and applying image', () => {
            cy.get('.upload')
                .click({force: true});
            cy.get('[data-cy="backgroundImageItem1"')
                .dblclick({force: true}).then(elem => {
                const element = Cypress.$(elem);
                loadedDataForExpectedStore.desktopLogoId = element.attr('dataid');
                loadedDataForExpectedStore.desktopLogoUrl = element.attr('dataurl');
            });
        });

        it('Checking workability of all alignment options', () => {
            cy.get('[for=left]')
                .click({force: true});
            cy.get('[for=center]')
                .click({force: true});
            cy.get('[for=right]')
                .click({force: true});
        });

        it('Choosing alignment which wee need', () => {
            cy.get('[for=center]')
                .click({force: true});
        })
    });


    describe('Changing logo mobile', function () {
        it('Switch device type to mobile', () => {
            cy.get('[data-id="mobile"] span')
                .click({force: true});
        });
        it('Setting color', () => {
            cy.get('[data-cy="logoDropDown"]')
                .click({force: true});
        });

        it('Choosing and applying image', () => {
            cy.get('.upload')
                .click({force: true});
            cy.get('[data-cy="backgroundImageItem0"')
                .dblclick({force: true}).then(elem => {
                const element = Cypress.$(elem);
                loadedDataForExpectedStore.mobileLogoId = element.attr('dataid');
                loadedDataForExpectedStore.mobileLogoUrl = element.attr('dataurl');
            });
        });

        it('Checking workability of all alignment options', () => {
            cy.get('[for=left]')
                .click({force: true});
            cy.get('[for=center]')
                .click({force: true});
            cy.get('[for=right]')
                .click({force: true});
        });

        it('Choosing alignment which wee need', () => {
            cy.get('[for=right]')
                .click({force: true});
        });

        it('Switch device type to desktop', () => {
            cy.get('[data-id="desktop"] span')
                .click({force: true})
        });
    });

    describe('Container desktop', function () {
        it('Border', () => {
            cy.get('[data-cy="containerDropDown"]')
                .click({force: true});

            fillColorHEX('[data-cy="borderColor"]', 'ff6900');

            cy.get('[data-cy="thickness"]')
                .select('3', {force: true});
            cy.get('[data-cy="radius"]')
                .select('2', {force: true});
        });
        it('Background', () => {
            fillColorHEXWithOpacity('[data-cy="containerBackground"', '5c4040', '0');
        });
        it('Size', () => {
            fillingFields('[data-cy="containerWidth"]', 1920);
        });
    });

    describe('Container mobile', function () {
        it('Switch device type to mobile', () => {
            cy.get('[data-id="mobile"] span')
                .click({force: true});
        });
        it('Border', () => {
            cy.get('[data-cy="containerDropDown"]')
                .click({force: true});

            fillColorHEX('[data-cy="borderColor"]', 'ff0000');

            cy.get('[data-cy="thickness"]')
                .select('1', {force: true});
            cy.get('[data-cy="radius"]')
                .select('5', {force: true});
        });
        it('Background', () => {
            fillColorHEXWithOpacity('[data-cy="containerBackground"', 'ff0000', '10');
        });
        it('Size', () => {
            fillingFields('[data-cy="containerWidth"]', 320);
        });

        it('Switch device type to desktop', () => {
            cy.get('[data-id="desktop"] span')
                .click({force: true})
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
                .click({force: true});
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

        it('Clear default top text', () => {
            clearFields('[data-cy="headerTopText"]');
        });
        it('Check cleared top text on Preview', () => {
            cy.get('[data-cy="headerTopTextPreview"]').should('have.text', '');
        });

        it('Enter top text', () => {
            fillingFields('[data-cy="headerTopText"]', 'CP TEST HEADER TEXT');
        });
        it('Check entered top text on Preview', () => {
            cy.get('[data-cy="headerTopTextPreview"]').should('have.text', 'CP TEST HEADER TEXT');
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

        it('Clear default description text', () => {
            clearFields('[data-cy="headerDescriptionText"]');
        });
        it('Check cleared description text on Preview', () => {
            cy.get('[data-cy="headerDescriptionTextPreview"]').should('have.text', '');
        });

        it('Enter description text', () => {
            fillingFields('[data-cy="headerDescriptionText"]', 'CP TEST DESCRIPTION TEXT');
        });
        it('Check entered description text on Preview', () => {
            cy.get('[data-cy="headerDescriptionTextPreview"]').should('have.text', 'CP TEST DESCRIPTION TEXT');
        });

        it('Set description text color', () => {
            fillColorHEX('[data-cy="headerDescriptionColor"]', 'edaa55');
        });
        //
        // it('Set description text font size', () => {
        //     setSomeSize('[data-cy="headerDescriptionFontSize"]', 23);
        // })
    });

    /**
     * TODO fix GDPR tests - they are passed or failed random
     *
     */

    // describe('GDPR drop-down', () => {
    //     it('Choosing needed setting', () => {
    //         cy.get('[data-cy="dropDownGDPR"]')
    //             .click({force: true});
    //     });
    //     it('Set option from GDPR list', () => {
    //         cy.get('[data-cy="gdprSettings"]')
    //             // .select('GDPR default');
    //             .select('Yes', {force: true});
    //     });
    //     it('Set GDPR text font size', () => {
    //         setSomeSize('[data-cy="gdprFontSize"]', 23);
    //     });
    //     it('Set GDPR text color', () => {
    //         fillColorHEX('[data-cy="gdprTextColor"]', 'edaa55');
    //     });
    // });

    describe('Login methods drop-down', () => {
        it('Choosing needed method(s)', () => {
            cy.get('[data-cy="dropDownLoginMethods"]')
                .click({force: true});
        });

        it('Select all', () => {
            cy.get('[data-cy="loginMethodFacebook"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodGoogle"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodPhone"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodConnectButton"]')
                .click({force: true});
        });

        it('Check all metods on Preview', () => {
            cy.get('[data-cy="loginMethodFacebookPreview"]');
            cy.get('[data-cy="loginMethodGooglePreview"]');
            cy.get('[data-cy="loginMethodPhonePreview"]');
            cy.get('[data-cy="loginMethodConnectButtonPreview"]');
        });

        it('Remove all', () => {
            cy.get('[data-cy="loginMethodFacebook"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodGoogle"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodPhone"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodConnectButton"]')
                .click({force: true});
        });

        it('Selecting needed methods', () => {
            cy.get('[data-cy="loginMethodFacebook"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodGoogle"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodPhone"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodConnectButton"]')
                .click({force: true});
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

        it('Check connect button text on Preview', () => {
            cy.get('[data-cy="loginMethodConnectButtonPreview"]').should('have.text', 'Connect FOR FREE');
        });

        it('Set connect button text color', () => {
            fillColorHEX('[data-cy="connectButtonTextColor"]', 'edaa55');
        });

        it('Set connect button background color', () => {
            fillColorHEXWithOpacity('[data-cy="connectButtonBackgroundColor"]', 'ffffff', '100');
        });

        it('Set connect button border color', () => {
            fillColorHEX('[ data-cy="connectButtonBorderColor"]', 'edaa55');
        });

        it('Set connect button border thickness', () => {
            cy.get('[data-cy="connectButtonBorderThickness"]')
                .select('1', {force: true});
        });

        it('Set connect button border radius', () => {
            cy.get('[data-cy="connectButtonBorderRadius"]')
                .select('5', {force: true});
        });

        it('Set connect button size', () => {
            setSomeSize('[data-cy="connectButtonWidth"]', 320);
            setSomeSize('[data-cy="connectButtonPadding"]', 10);
        });
    });

    describe('Footer drop-down', () => {
        it('Open drop-down', () => {
            cy.get('[data-cy="dropDownFooter"]')
                .click({force: true})
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

        it('Clear default footer text', () => {
            clearFields('[data-cy="footerText"]');
        });
        it('Check cleared footer text on Preview', () => {
            cy.get('[data-cy="footerTextPreview"]').should('have.text', '');
        });

        it('Enter footer text', () => {
            fillingFields('[data-cy="footerText"]', 'TEST FOOTER TEXT');
        });
        it('Check entered footer text on Preview', () => {
            cy.get('[data-cy="footerTextPreview"]').should('have.text', 'TEST FOOTER TEXT');
        });

        it('Set footer text color', () => {
            fillColorHEX('[ data-cy="footerTextColor"]', 'edaa55');
        });
    });

    describe('Success actions drop-down', () => {
        it('Open drop-down', () => {
            cy.get('[data-cy="dropDownSuccessActions"]')
                .click({force: true})
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
        it('Check entered success text on Preview', () => {
            cy.get('[data-cy="successTextPreview"]').should('have.text', 'CP TEST SOME SUCCESS MESSAGE TEXT');
        });

        it('Set success text color', () => {
            fillColorHEX('[ data-cy="successTextColor"]', 'edaa55');
        });

        it('Enter success page redurect URL', () => {
            fillingFields('[data-cy="successPageRedirect"]', 'http://google.com');
        });
    });

});

// context('Settings tab', function () {
//     beforeEach(function () {
//         cy.viewport('macbook-11')
//     });
//     describe('Style tab', () => {
//         it('Style tab', () => {
//             cy.get('[data-cy="settingsTab"]')
//                 .click({force: true});
//         })
//     })
// });

context('Tests finished', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });

    describe('Open Preview', () => {
        it('Going to preview', () => {
            cy.get('[data-cy="previewBtn"]')
                .click({force: true});
        })
    })
});

var deepDiffMapper = function () {
    return {
        VALUE_CREATED: '!DIFF!# created #!DIFF!',
        VALUE_UPDATED: '!DIFF!# updated #!DIFF!',
        VALUE_DELETED: '!DIFF!# deleted #!DIFF!',
        VALUE_UNCHANGED: 'unchanged',
        map: function (obj1, obj2) {
            if (this.isFunction(obj1) || this.isFunction(obj2)) {
                throw 'Invalid argument. Function given, object expected.';
            }
            if (this.isValue(obj1) || this.isValue(obj2)) {
                return {
                    type: this.compareValues(obj1, obj2),
                    data: obj1 === undefined ? obj2 : obj1
                };
            }
            var diff = {};
            for (var key in obj1) {
                if (this.isFunction(obj1[key])) {
                    continue;
                }
                var value2 = undefined;
                if (obj2[key] !== undefined) {
                    value2 = obj2[key];
                }
                diff[key] = this.map(obj1[key], value2);
            }
            for (var key in obj2) {
                if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
                    continue;
                }
                diff[key] = this.map(undefined, obj2[key]);
            }
            return diff;
        },
        compareValues: function (value1, value2) {
            if (value1 === value2) {
                return this.VALUE_UNCHANGED;
            }
            if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
                return this.VALUE_UNCHANGED;
            }
            if (value1 === undefined) {
                return this.VALUE_CREATED;
            }
            if (value2 === undefined) {
                return this.VALUE_DELETED;
            }
            return this.VALUE_UPDATED;
        },
        isFunction: function (x) {
            return Object.prototype.toString.call(x) === '[object Function]';
        },
        isArray: function (x) {
            return Object.prototype.toString.call(x) === '[object Array]';
        },
        isDate: function (x) {
            return Object.prototype.toString.call(x) === '[object Date]';
        },
        isObject: function (x) {
            return Object.prototype.toString.call(x) === '[object Object]';
        },
        isValue: function (x) {
            return !this.isObject(x) && !this.isArray(x);
        }
    }
}();

context('Starting comparing collected data', function () {

    beforeEach(function () {
        cy.viewport('macbook-11')
    });

    describe('Unit test for data collecting', function () {
        it('Has expected state on CP building finish', () => {
            cy.url().should('include', '/captive-portals/new').then(() => {
                cy.window().then(win => {
                    // const store = GetBuilderParams(Object.assign({}, win.__store__));
                    const expectedStore = {
                        background: loadedDataForExpectedStore.mobileBackgroundUrl,
                        name: "CP TEST NAME",
                        externalCss: "",
                        desktopLogoId: loadedDataForExpectedStore.desktopLogoId,
                        mobileLogoId: loadedDataForExpectedStore.mobileLogoId,
                        desktopBackgroundId: loadedDataForExpectedStore.desktopBackgroundId,
                        mobileBackgroundId: loadedDataForExpectedStore.mobileBackgroundId,
                        header: "CP TEST HEADER TEXT",
                        description: "CP TEST DESCRIPTION TEXT",
                        footer: "TEST FOOTER TEXT",
                        successMessage: "CP TEST SOME SUCCESS MESSAGE TEXT",
                        style: {
                            header: {
                                top: {
                                    color: {
                                        rgba: {r: 237, g: 170, b: 85, a: 1},
                                        hex: "#edaa55"
                                    },
                                    fontSize: 18,
                                    family: 'Arial',
                                    textActions: {bold: false, italic: false, underline: false},
                                    alignment: "center"
                                },
                                description: {
                                    color: {
                                        rgba: {r: 237, g: 170, b: 85, a: 1},
                                        hex: "#edaa55"
                                    },
                                    fontSize: 18,
                                    family: 'Arial',
                                    textActions: {bold: false, italic: false, underline: false},
                                    alignment: "center"
                                }
                            },
                            footer: {
                                color: {
                                    rgba: {r: 237, g: 170, b: 85, a: 1},
                                    hex: "#edaa55"
                                },
                                fontSize: 18,
                                family: 'Arial',
                                textActions: {bold: false, italic: false, underline: false},
                                alignment: "center"
                            },
                            /**
                             * TODO fix gdpr tests
                             */
                            gdpr_settings: {
                                color: {rgba: {r: 85, g: 133, b: 237, a: 1}, hex: "#5585ed"},
                                fontSize: 14,
                                family: 'Arial',
                            },
                            success_message: {
                                color: {
                                    rgba: {r: 237, g: 170, b: 85, a: 1},
                                    hex: "#edaa55"
                                },
                                fontSize: 18,
                                family: 'Arial',
                                textActions: {bold: false, italic: false, underline: false},
                                alignment: "center"
                            },
                            background_and_logo: {
                                desktopBackground: {
                                    url: loadedDataForExpectedStore.desktopBackgroundUrl,
                                    color: {rgba: {r: 229, g: 233, b: 242, a: 1,}, hex: '#e5e9f2'},
                                    backgroundType: 'IMAGE',
                                    repeat: 'no-repeat',
                                    position: {
                                        inPercentDimension: false,
                                        posX: 0,
                                        posY: 0,
                                        option: 'left top'
                                    },
                                    attachment: "scroll",
                                    size: {
                                        inPercentDimension: true,
                                        width: 50,
                                        height: 50,
                                        option: '50% 50%'
                                    },
                                },
                                mobileBackground: {
                                    url: loadedDataForExpectedStore.mobileBackgroundUrl,
                                    color: {rgba: {r: 229, g: 233, b: 242, a: 1,}, hex: '#e5e9f2'},
                                    backgroundType: 'IMAGE',
                                    repeat: 'repeat-y',
                                    position: {
                                        inPercentDimension: false,
                                        posX: 0,
                                        posY: 0,
                                        option: 'center top'
                                    },
                                    attachment: "scroll",
                                    size: {
                                        inPercentDimension: true,
                                        width: 80,
                                        height: 80,
                                        option: '80% 80%'
                                    },
                                },
                                desktopLogo: {
                                    url: loadedDataForExpectedStore.desktopLogoUrl,
                                    horizontalPosition: 'center',
                                    verticalPosition: 'middle'
                                },
                                mobileLogo: {
                                    url: loadedDataForExpectedStore.mobileLogoUrl,
                                    horizontalPosition: 'flex-end',
                                    verticalPosition: 'middle'
                                }
                            },
                            desktop_container: {
                                background: {
                                    color: { rgba: {r: 92, g: 64, b: 64, a: 0}, hex: "#5c4040" },
                                    opacity: 100
                                },
                                border: {
                                    color: { rgba: {r: 255, g: 105, b: 0, a: 1}, hex: "#ff6900" },
                                    type: "solid",
                                    thickness: 3,
                                    radius: 2
                                },
                                size: {
                                    width: 1920,
                                    padding: 20
                                },
                                position: {
                                    vertical: 'middle'
                                },
                            },
                            mobile_container: {
                                background: {
                                    color: { rgba: {r: 255, g: 0, b: 0, a: 0.1}, hex: "#ff0000" },
                                    opacity: 100
                                },
                                border: {
                                    color: { rgba: {r: 255, g: 0, b: 0, a: 1}, hex: "#ff0000" },
                                    type: "solid",
                                    thickness: 1,
                                    radius: 5
                                },
                                size: {
                                    width: 320,
                                    padding: 20
                                },
                                position: {
                                    vertical: 'middle'
                                },
                            },
                            accept_button_font: {
                                alignment: "center",
                                color: {hex: "#edaa55", rgba: {r: 237, g: 170, b: 85, a: 1}},
                                fontSize: 18,
                                family: 'Arial',
                                textActions: {bold: false, italic: false, underline: false}
                            },
                            accept_button_color: {
                                hex: "#ffffff",
                                rgba: {r: 255, g: 255, b: 255, a: 1}
                            },
                            accept_button_size: {width: 320, padding: 10},
                            accept_button_border: {
                                color: {hex: "#edaa55", rgba: {r: 237, g: 170, b: 85, a: 1}},
                                radius: 5, type: "solid", thickness: 1
                            }
                        },
                        fontId: '',
                        googleLogin: true,
                        facebookLogin: true,
                        twitterLogin: false,
                        phoneLogin: true,
                        acceptTermsLogin: true,
                        successRedirectUrl: "",
                        termAndConditionId: "",
                        acceptButtonText: "Connect FOR FREE",
                    };
                    const store = {...win.__store__.collectDataToTest};
                    console.log('Store', store);
                    console.log('Expected store', expectedStore);
                    console.log(JSON.stringify(store));
                    console.log(JSON.stringify(expectedStore));
                    const storesDiff = deepDiffMapper.map(store, expectedStore);
                    console.log('Store Difference', storesDiff);
                    console.log('Store Difference str', JSON.stringify(storesDiff));
                    expect(store).to.deep.equal(expectedStore)
                })
            });
        });
    });
});
