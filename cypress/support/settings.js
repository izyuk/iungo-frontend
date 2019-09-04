export const APPLICATION_HOST = Cypress.env('APPLICATION_HOST') || 'http://localhost:9000';
export const LOGIN_EMAIL = Cypress.env('LOGIN_EMAIL') || 'dmitriy.izyuk@gmail.com';
export const LOGIN_PASSWORD = Cypress.env('LOGIN_PASSWORD') || 'Izyuk8968';

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

export function clearFields(selector) {
    cy.get(selector)
        .focus()
        .clear({force: true})
        .blur({force: true});
}

export function fillingFields(selector, text) {
    cy.get(selector)
        .focus()
        .clear({force: true})
        .type(text, {force: true})
        .blur({force: true});
}

export function fillingFieldsWithFindOption(selector, whatToFind, text) {
    cy.get(selector)
        .find(whatToFind)
        .focus()
        .type(text);
}

export function fillColorHEX(selector, hex) {
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

export function fillColorHEXWithOpacity(selector, hex, opacity) {
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

export function fontStylingActions(selector1, selector2, selector3) {
    cy.get(selector1)
        .click({force: true});
    cy.get(selector2)
        .click({force: true});
    cy.get(selector3)
        .click({force: true});
}

export function alignmentsActions(selector1, selector2, selector3) {
    cy.get(selector1)
        .check({force: true});
    cy.get(selector2)
        .check({force: true});
    cy.get(selector3)
        .check({force: true});
}

export function setSomeSize(selector, value) {
    cy.get(selector)
        .focus()
        .clear({force: true})
        .type(value, {force: true})
        .blur({force: true});
}

export function contextLoginToSystem() {
    context('Login to system', function () {
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
    });
}