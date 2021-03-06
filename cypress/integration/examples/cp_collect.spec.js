
import { GetBuilderParams } from "../../../src/components/captivePortal/optionsSidebar/getBuilderParams";
import {
    contextLoginToSystem,
    clearFields,
    fillingFields,
    fillingFieldsWithFindOption,
    fillColorHEX,
    fillColorHEXWithOpacity,
    fontStylingActions,
    alignmentsActions,
    setSomeSize
} from '../../support/settings';

const testPayload = {
    desktopBackgroundId: "331",
    desktopBackgroundUrl: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/nasa-53884-unsplash.jpg",
    mobileBackgroundId: "331",
    mobileBackgroundUrl: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/nasa-53884-unsplash.jpg",
    desktopLogoId: "330",
    desktopLogoUrl: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/google_logo.svg",
    mobileLogoId: "330",
    mobileLogoUrl: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/google_logo.svg",
    languages: [],
    defaultLang: '',
    texts: {
        name: `CP TEST NAME`,
        header: `CP TEST HEADER TEXT`,
        description: `CP TEST DESCRIPTION TEXT`,
        footer: `CP TEST FOOTER TEXT`,
        successMessage: `CP TEST SOME SUCCESS MESSAGE TEXT`,
        acceptButtonText: `Connect FOR FREE`,
    }
};

contextLoginToSystem();

context('Start and going to CP', function () {

    describe('CP templates', function () {
        it('Going to CP templates', () => {
            cy.get('[data-cy="addNewCP"]')
                .click({force: true})
        });
    });

    describe('NEW CP', function () {
        it('Creating new CP', () => {
            cy.get('.newTemplate')
                .click({force: true}).wait(1000)
        });

        it('Setting name', () => {
            fillingFields('[data-cy="captivePortalName"]', testPayload.texts.name);
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
            cy.get('[data-cy="uploadImage"]')
                .click({force: true});
            cy.get('[data-cy="backgroundImageItem0"]')
                .dblclick({force: true}).then(elem => {
                const element = Cypress.$(elem);
                testPayload.desktopBackgroundId = element.attr('dataid');
                testPayload.desktopBackgroundUrl = element.attr('dataurl');
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
            fillingFields('[data-cy="backgroundWidth"]', '50');
            fillingFields('[data-cy="backgroundHeight"]', '50');
        });
    });

    describe('Changing background mobile', function () {
        it('Switch device type to mobile', () => {
            cy.get('[data-id="mobile"] span')
                .click({force: true});
        });
        it('Choosing and applying image', () => {
            cy.get('[data-cy="uploadImage"]')
                .click({force: true});
            cy.get('[data-cy="backgroundImageItem1"]')
                .dblclick({force: true}).then(elem => {
                const element = Cypress.$(elem);
                testPayload.mobileBackgroundId = element.attr('dataid');
                testPayload.mobileBackgroundUrl = element.attr('dataurl');
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
            fillingFields('[data-cy="backgroundWidth"]', '80');
            fillingFields('[data-cy="backgroundHeight"]', '80');
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
            cy.get('[data-cy="uploadImage"]')
                .click({force: true});
            cy.get('[data-cy="backgroundImageItem1"]')
                .dblclick({force: true}).then(elem => {
                const element = Cypress.$(elem);
                testPayload.desktopLogoId = element.attr('dataid');
                testPayload.desktopLogoUrl = element.attr('dataurl');
            });
        });

        it('Checking workability of all horizontal alignment options', () => {
            cy.get('[data-cy="logoHorizontalAlignment_Left"]')
                .click({force: true});
            cy.get('[data-cy="logoHorizontalAlignment_Center"]')
                .click({force: true});
            cy.get('[data-cy="logoHorizontalAlignment_Right"]')
                .click({force: true});
        });

        it('Choosing horizontal alignment which wee need', () => {
            cy.get('[data-cy="logoHorizontalAlignment_Center"]')
                .click({force: true});
        });

        it('Checking workability of all vertical alignment options', () => {
            cy.get('[data-cy="logoVerticalAlignment_Top"]')
                .click({force: true});
            cy.get('[data-cy="logoVerticalAlignment_Middle"]')
                .click({force: true});
            cy.get('[data-cy="logoVerticalAlignment_Bottom"]')
                .click({force: true});
        });

        it('Choosing vertical alignment which wee need', () => {
            cy.get('[data-cy="logoVerticalAlignment_Middle"]')
                .click({force: true});
        });
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
            cy.get('[data-cy="uploadImage"]')
                .click({force: true});
            cy.get('[data-cy="backgroundImageItem0"]')
                .dblclick({force: true}).then(elem => {
                const element = Cypress.$(elem);
                testPayload.mobileLogoId = element.attr('dataid');
                testPayload.mobileLogoUrl = element.attr('dataurl');
            });
        });

        it('Checking workability of all horizontal alignment options', () => {
            cy.get('[data-cy="logoHorizontalAlignment_Left"]')
                .click({force: true});
            cy.get('[data-cy="logoHorizontalAlignment_Center"]')
                .click({force: true});
            cy.get('[data-cy="logoHorizontalAlignment_Right"]')
                .click({force: true});
        });

        it('Choosing horizontal alignment which wee need', () => {
            cy.get('[data-cy="logoHorizontalAlignment_Right"]')
                .click({force: true});
        });

        it('Checking workability of all vertical alignment options', () => {
            cy.get('[data-cy="logoVerticalAlignment_Top"]')
                .click({force: true});
            cy.get('[data-cy="logoVerticalAlignment_Middle"]')
                .click({force: true});
            cy.get('[data-cy="logoVerticalAlignment_Bottom"]')
                .click({force: true});
        });

        it('Choosing vertical alignment which wee need', () => {
            cy.get('[data-cy="logoVerticalAlignment_Top"]')
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
            fillColorHEXWithOpacity('[data-cy="containerBackground"]', '5c4040', '0');
        });

        it('Checking workability of all vertical alignment options', () => {
            cy.get('[data-cy="containerVerticalAlignment_Top"]')
                .click({force: true});
            cy.get('[data-cy="containerVerticalAlignment_Middle"]')
                .click({force: true});
            cy.get('[data-cy="containerVerticalAlignment_Bottom"]')
                .click({force: true});
        });

        it('Choosing vertical alignment which wee need', () => {
            cy.get('[data-cy="containerVerticalAlignment_Middle"]')
                .click({force: true});
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

        it('Checking workability of all vertical alignment options', () => {
            cy.get('[data-cy="containerVerticalAlignment_Top"]')
                .click({force: true});
            cy.get('[data-cy="containerVerticalAlignment_Middle"]')
                .click({force: true});
            cy.get('[data-cy="containerVerticalAlignment_Bottom"]')
                .click({force: true});
        });

        it('Choosing vertical alignment which wee need', () => {
            cy.get('[data-cy="containerVerticalAlignment_Top"]')
                .click({force: true});
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
            cy.get('[data-cy="dropDownHeader"]')
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
            cy.get('[data-cy="headerTopTextPreview"]').should('not.exist');
        });

        it('Enter top text', () => {
            fillingFields('[data-cy="headerTopText"]', testPayload.texts.header);
        });
        it('Check entered top text on Preview', () => {
            cy.get('[data-cy="headerTopTextPreview"]').should('have.text', testPayload.texts.header);
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
            cy.get('[data-cy="headerDescriptionTextPreview"]').should('not.exist');
        });

        it('Enter description text', () => {
            fillingFields('[data-cy="headerDescriptionText"]', testPayload.texts.description);
        });
        it('Check entered description text on Preview', () => {
            cy.get('[data-cy="headerDescriptionTextPreview"]').should('have.text', testPayload.texts.description);
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
            cy.get('[data-cy="loginMethodPhone"]')
                .click({force: true});
            cy.get('[data-cy="loginMethodConnectButton"]')
                .click({force: true});
        });

        it('Selecting needed methods', () => {
            cy.get('[data-cy="loginMethodFacebook"]')
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
            fillingFields('[data-cy="connectButtonText"]', testPayload.texts.acceptButtonText);
        });

        it('Check connect button text on Preview', () => {
            cy.get('[data-cy="loginMethodConnectButtonPreview"]').should('have.text', testPayload.texts.acceptButtonText);
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
            cy.get('[data-cy="footerTextPreview"]').should('not.exist');
        });

        it('Enter footer text', () => {
            fillingFields('[data-cy="footerText"]', testPayload.texts.footer);
        });
        it('Check entered footer text on Preview', () => {
            cy.get('[data-cy="footerTextPreview"]').should('have.text', testPayload.texts.footer);
        });

        it('Set footer text color', () => {
            fillColorHEX('[data-cy="footerTextColor"]', 'edaa55');
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
            fillingFields('[data-cy="successText"]', testPayload.texts.successMessage);
        });
        it('Check entered success text on Preview', () => {
            cy.get('[data-cy="successTextPreview"]').should('have.text', testPayload.texts.successMessage);
        });

        it('Set success text color', () => {
            fillColorHEX('[data-cy="successTextColor"]', 'edaa55');
        });

        it('Enter success page redurect URL', () => {
            fillingFields('[data-cy="successPageRedirect"]', 'http://google.com');
        });
    });

    describe('Language settings drop-down', () => {
        it('Open drop-down', () => {
            cy.get('[data-cy="dropDownLocalizationSettings"]')
                .click({force: true})
        });

        it('Add all languages', () => {
            cy.get('[data-cy="languageSettingsSelect"]')
                .find('.dropdown-heading-value')
                .click({force: true});
            cy.get('[data-cy="languageSettingsSelectOption"]').each(($el) => {
                if ($el.attr('data-checked') !== 'true') {
                    cy.wrap($el).find('input[type="checkbox"]').click();
                }
            });
        });

        const fields = [
            { name: 'languageSettingsName' , val: testPayload.texts.header },
            { name: 'languageSettingsDescription' , val: testPayload.texts.description },
            { name: 'languageSettingsFooter' , val: testPayload.texts.footer },
            { name: 'languageSettingsConnectButton' , val: testPayload.texts.acceptButtonText },
            { name: 'languageSettingsSuccessMessage' , val: testPayload.texts.successMessage },
        ];

        it('Fill translations', () => {
            cy.get('[data-cy="languageSettingsTab"]').each(($el) => {
                const language = $el.attr('data-lang');
                testPayload.languages.push(language);
                cy.wrap($el).click();
                cy.get('[data-cy="languageSettingsDefaultCheckbox"]').then($el => {
                    const defaultChecked = $el.attr('data-checked');
                    console.log('!#!defaultChecked', defaultChecked);
                    if (defaultChecked === 'checked') { testPayload.defaultLang = language; }
                });
                fields.map(field => {
                    fillingFields(`[data-cy="${field.name}"]`, `${field.val} ${language}`);
                });
            });
        });

    });

    describe('Update languages on Preview by inline editing', () => {

        const langs = [];

        it('Get all languages in language switcher', () => {
            cy.get('[data-cy="langaugeSwitcherPreview"]')
                .click().wait(500);
            cy.get('[data-cy="languagesModalPreviewItem"]').each(($el) => {
                const language = $el.attr('data-lang');
                langs.push(language);
            });
            cy.get('[data-cy="languagesModalPreviewClose"]')
                .click().wait(500);
        });

        it('Languages in preview language switcher should be the same as in Language settings', () => {
            expect(langs.length).to.be.equal(testPayload.languages.length);
        });

        const fields = [
            { name: 'headerTopTextPreview' , val: testPayload.texts.header },
            { name: 'headerDescriptionTextPreview' , val: testPayload.texts.description },
            { name: 'footerTextPreview' , val: testPayload.texts.footer },
            { name: 'loginMethodConnectButtonPreview' , val: testPayload.texts.acceptButtonText },
        ];

        it('Update languages on Preview by inline editing', () => {
            langs.map(lang => {

                cy.get('[data-cy="langaugeSwitcherPreview"]')
                    .click().wait(500);
                cy.get(`[data-cy="languagesModalPreviewItem"][data-lang="${lang}"]`)
                    .click();

                fields.map(field => {
                    cy.get(`[data-cy="${field.name}"]`)
                        .click()
                        .clear({force: true})
                        .type(`${field.val} ${lang} (inline edited)`, {force: true});
                });

            });
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
                .click({force: true}).wait(1000);
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
                        background: testPayload.mobileBackgroundUrl,
                        name: testPayload.texts.name,
                        externalCss: "",
                        desktopLogoId: testPayload.desktopLogoId,
                        mobileLogoId: testPayload.mobileLogoId,
                        desktopBackgroundId: testPayload.desktopBackgroundId,
                        mobileBackgroundId: testPayload.mobileBackgroundId,
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
                                    url: testPayload.desktopBackgroundUrl,
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
                                    url: testPayload.mobileBackgroundUrl,
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
                                    url: testPayload.desktopLogoUrl,
                                    horizontalPosition: 'center',
                                    verticalPosition: 'middle'
                                },
                                mobileLogo: {
                                    url: testPayload.mobileLogoUrl,
                                    horizontalPosition: 'flex-end',
                                    verticalPosition: 'top'
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
                                    vertical: 'top'
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
                        fontIds: [],
                        googleLogin: false,
                        facebookLogin: true,
                        twitterLogin: false,
                        phoneLogin: true,
                        acceptTermsLogin: true,
                        successRedirectUrl: 'http://google.com',
                        termAndConditionId: "",
                        translations: [],
                    };
                    testPayload.languages.map(lang => {
                        const isDefault = (testPayload.defaultLang === lang);
                        expectedStore.translations.push({
                            locale: lang,
                            default: isDefault,
                            header: `${testPayload.texts.header} ${lang} (inline edited)`,
                            description: `${testPayload.texts.description} ${lang} (inline edited)`,
                            footer: `${testPayload.texts.footer} ${lang} (inline edited)`,
                            successMessage: `${testPayload.texts.successMessage} ${lang}`,
                            acceptButtonText: `${testPayload.texts.acceptButtonText} ${lang} (inline edited)`,
                        })
                    });
                    const store = GetBuilderParams({...win.__store__.collectDataToTest});
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
