
import {
    contextLoginToSystem,
    fillingFields,
} from '../../support/settings';

const testPayload = {
    portalName: '',
    portalExternalUrl: '',
    newHotspotUUID: ''
};

contextLoginToSystem();

context('Hotspots', function () {
    beforeEach(function () {
        cy.viewport('macbook-11');
        cy.restoreLocalStorage();
    });
    afterEach(() => {
        cy.saveLocalStorage();
    });

    describe('Create New Hoptspot', function () {
        it('Going to new Hoptspot form', () => {
            cy.get('[data-cy="linkHotspots"]')
                .click({force: true})
            cy.get('[data-cy="addNewHotspot"]')
                .click({force: true})
        });

        it('Try to save without data (check validation)', () => {
            cy.get('[data-cy="newHotspotSave"]')
                .click({force: true});
        });

        it('Form should have validation error message', () => {
            cy.get('[data-cy="newHotspotForm"]').find('.errorText')
        });

        it('Set hotspot name', () => {
            fillingFields('[data-cy="newHotspotName"]', 'HOTSPOT TEST NAME');
        });

        it('Set hotspot address', () => {
            fillingFields('[data-cy="newHotspotAddress"]', 'TEST ADDRESS');
        });

        it('Set hotspot description', () => {
            fillingFields('[data-cy="newHotspotDescription"]', 'TEST DESCRIPTION');
        });

        it('Select Captive Portal', () => {
            testPayload.portalName = 'Template';
            cy.get('[data-cy="newHotspotSelectCP_Option_0"]').then(elem => {
                const element = Cypress.$(elem);
                testPayload.portalName = element.attr('data-name');
                testPayload.portalExternalUrl = element.attr('portalurl');
                cy.get('[data-cy="newHotspotSelectCP"]')
                    .select(testPayload.portalName, {force: true});
            });
        });

        it('Check Captive Portal preview', () => {
            cy.get('[data-cy="portalPreviewIframe"]').then(elem => {
                const element = Cypress.$(elem);
                const previewUrl = element.attr('src');
                expect(previewUrl).to.equal(testPayload.portalExternalUrl);
            });
        });

        it('Save new hotspot', () => {
            cy.get('[data-cy="newHotspotSave"]')
                .click({force: true}).wait(3000);
        });

        it('Check hotspot id in location url', () => {
            cy.location().should((loc) => {
                expect(loc.pathname).to.have.string('/hotspot/')
                expect(loc.pathname).to.not.eq('/hotspot/new')
                testPayload.newHotspotUUID = loc.pathname.replace('/hotspot/', '');
            })
        });

    });

    describe('Check new Hotspot in Hotspots List', function () {

        it('Going to new Hoptspots List', () => {
            cy.get('[data-cy="linkHotspots"]')
                .click({force: true})
        });

        it('Open first items of Hotspots List', () => {
            cy.get('[data-cy="hotspotsList"]')
                .find('.ag-center-cols-clipper')
                .find('.ag-row-first')
                .click({force: true}).wait(3000)
        });

        it('Check hotspot id in location url', () => {
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq(`/hotspot/${testPayload.newHotspotUUID}`)
            })
        });

    });


});