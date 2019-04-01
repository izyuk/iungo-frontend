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
    // beforeEach(() => {
    //     cy.visit('http://localhost:9000/captive-portals')
    // });
    it('Creating', () => {
        cy.get('.addNewCPButton')
            .click()
    });

    it('Device toggle', () => {
        cy.get('[data-id="mobile"] span')
            .click();
        cy.get('[data-id="desktop"] span')
            .click()
    })


});
