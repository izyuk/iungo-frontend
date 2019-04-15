import {Enter} from '../../../src/components/login/enter';
import React from 'react'

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

context('Login', function () {
    beforeEach(function () {
        cy.viewport('macbook-11')
    });
    describe('Making sure that you are logged out', () => {
        it('Removing user data', () => {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            cy.visit('http://localhost:9000');
        });
    });

    describe('Emulating entering', () => {
        it('Setting data', () => {
            localStorage.setItem('email', 'qwe@qwe.qwe');
            localStorage.setItem('token', 'qweqweqweqwe');
            // cy.visit('http://localhost:9000/captive-portals');
        });
        it('Setting component state', () => {
            console.log(cy);
            cy.mount(<Enter/>);
            cy.contains('Enter');
            cy.get(Enter)
                .invoke('setState', {auth: true});
        })
    });

    //
    // describe('Login form', () => {
    //     it('Filling login inputs with correct data', () => {
    //         cy.visit('http://localhost:9000');
    //         fillingFieldsWithFindOption('.email', 'input', 'dmitriy.izyuk@gmail.com');
    //         fillingFieldsWithFindOption('.password', 'input', 'Izyuk8968');
    //         cy.get('.login')
    //             .click();
    //     });
    // });

    // describe('NEW CP', function () {
    //     it('Creating', () => {
    //         cy.get('.addNewCPButton')
    //             .click()
    //     });
    //
    //     it('Setting name', () => {
    //         fillingFields('[data-cy="captivePortalName"]', 'CP TEST NAME');
    //     });
    //
    //     it('Device toggle', () => {
    //         cy.get('[data-id="mobile"] span')
    //             .click();
    //         cy.get('[data-id="desktop"] span')
    //             .click()
    //     });
    //
    // });
});
