describe('Inputs login form (wrong creds)', function () {
    it('fill login inputs', () => {
        cy.visit('http://localhost:9000');
        cy.visit('http://localhost:9000/reset');
        cy.visit('http://localhost:9000');

        cy.get('.email > input')
            .focus()
            .type('dummy.email@gmail.com');
        cy.get('.password > input')
            .focus()
            .type('12345678');
        cy.get('.login')
            .click();
    })
});

describe('Inputs login form', function () {
    it('fill login inputs', () => {
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

    it('Device toggle', () => {
        cy.get('[data-id="mobile"] span')
            .click();
        cy.get('[data-id="desktop"] span')
            .click()
    });

});

context('Style tab', function () {
    describe('Changing background', function () {
        it('Setting color', () => {
            cy.get('[data-cy="openColorPicker"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div:first-child')
                .find('input')
                .focus()
                .clear()
                .type('303338')
                .blur();
            cy.get('.colorWrap > div > div:first-child')
                .click();
        });
    });


    describe('Changing logo', function () {
        it('Setting color', () => {
            cy.get('[data-cy="logoDropDown"]')
                .click();
            cy.get('.upload')
                .click();
            cy.get('[dataid=203]')
                .click();
            cy.get('.close')
                .click();
            cy.get('[for=left]')
                .click();
            cy.get('[for=center]')
                .click();
            cy.get('[for=right]')
                .click();
            cy.get('[for=left]')
                .click();
            cy.get('[for=center]')
                .click();
        });
    });

    describe('Container', function () {
        it('Border', () => {
            cy.get('[data-cy="containerDropDown"]')
                .click();
            cy.get('[ data-cy="borderColor"]')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div:first-child')
                .find('input')
                .focus()
                .clear()
                .type('ff6900')
                .blur();
            cy.get('.colorWrap > div > div:first-child')
                .click();
            cy.get('[data-cy="thickness"]')
                .select('3');
            cy.get('[data-cy="radius"]')
                .select('2');
        });
        it('Background', () => {
            cy.get('[data-cy="containerBackground"')
                .click();
            cy.get('.flexbox-fix:nth-child(3) > div:first-child')
                .find('input')
                .focus()
                .clear()
                .type('5c4040')
                .blur();
            cy.get('.flexbox-fix:nth-child(3) > div:last-child')
                .find('input')
                .focus()
                .clear()
                .type('0')
                .blur();
            cy.get('.colorWrap > div > div:first-child')
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

});




// describe('Unit test for data collecting', function () {
//     it('has expected state on CP building finish', () => {
//         cy.visit('http://localhost:9000/captive-portals');
//         cy.window().its('store').invoke('getState').should('deep.equal', {
//             background_and_logo: {
//                 logo: {
//                     url: "https://test-b4f06f8a-5f6d-4c7d-81d5-e7f8549c0fe5.s3.eu-west-1.amazonaws.com/4.jpg",
//                     position: "center"
//                 },
//                 background: {
//                     url: "",
//                     color: {rgba: {r: 48, g: 51, b: 56, a: 1}, hex: "#303338"},
//                     type: "color"
//                 }
//             },
//             tabName: [],
//             container_border: {
//                 color: {rgba: {r: 255, g: 105, b: 0, a: 1}, hex: "#ff6900"},
//                 type: "solid",
//                 thickness: 3,
//                 radius: 2
//             },
//             container_background: {
//                 color: {rgba: {r: 92, g: 64, b: 64, a: 0}, hex: "#5c4040"},
//                 opacity: 100
//             },
//             container_size: {width: 1920, padding: 20},
//             header: {
//                 top: {
//                     text: "CP TEST HEADER TEXT",
//                     styles: {
//                         color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
//                         alignment: "center",
//                         fontSize: 18,
//                         textActions: {bold: false, italic: false, underline: false}
//                     }
//                 },
//                 description: {
//                     text: "CPTEST DESCRIPTION TEXT",
//                     styles: {
//                         color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
//                         alignment: "center",
//                         fontSize: 23,
//                         textActions: {bold: false, italic: false, underline: false}
//                     }
//                 }
//             },
//             login_methods: {methods: {facebook: true, google: true, twitter: false, button: true}},
//             footer: {
//                 text: " TEST FOOTER TEXT",
//                 styles: {
//                     color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
//                     alignment: "center",
//                     fontSize: 18,
//                     textActions: {bold: false, italic: false, underline: false}
//                 }
//             },
//             successMessage: {
//                 text: "CP TEST SOME SUCCESS MESSAGE TEXT",
//                 styles: {
//                     color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
//                     alignment: "center",
//                     fontSize: 18,
//                     textActions: {bold: false, italic: false, underline: false}
//                 }
//             },
//             token: {},
//             name: {"name": "CP FOR TESTING"},
//             css: {"path": ""},
//             redirectURL: {url: "http://http://google.com"},
//             imagesIDs: {logoID: 203, backgroundID: ""},
//             loginAgreeButton: {
//                 acceptButtonText: "Connect FOR FREE",
//                 acceptButtonColor: {rgba: {r: 255, g: 255, b: 255, a: 0}, hex: "#ffffff"},
//                 acceptButtonFont: {
//                     color: {rgba: {r: 237, g: 170, b: 85, a: 1}, hex: "#edaa55"},
//                     alignment: "center",
//                     fontSize: 18,
//                     textActions: {bold: false, italic: false, underline: false}
//                 },
//                 acceptButtonSize: {padding: 10, width: 320},
//                 acceptButtonBorder: {
//                     color: {rgba: {r: 85, g: 133, b: 237, a: 1}, hex: "#5585ed"},
//                     radius: 5,
//                     thickness: 1,
//                     type: "solid"
//                 }
//             }
//         })
//     })
// });
