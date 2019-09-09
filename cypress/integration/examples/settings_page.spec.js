import {
    contextLoginToSystem,
    clearFields,
    fillingFields,
} from '../../support/settings';

const testPayload = {
    profileFields: [
        { name: 'companyProfileName', val: 'Echo', fakeVal: 'Test' },
        { name: 'companyProfileCompanyCode', val: 'Echo comp. 0099563', fakeVal: 'Test' },
        { name: 'companyProfileAddress', val: 'Zelena st., 44a', fakeVal: 'Test' },
        { name: 'companyProfileZipCode', val: '11111', fakeVal: '00000' },
        { name: 'companyProfileCountry', val: 'Ukraine', fakeVal: 'Test' },
        { name: 'companyProfileCity', val: 'Lviv', fakeVal: 'Test' },
    ],
    profileCurrentLanguage: '',
    profileChangedLanguage: '',
    mailerliteFields: [
        { name: 'mailerliteIntegrationApiKey', val: 'sjD39DJ29sSnsi3101lncdlmclsl', fakeVal: '01010101010101010101010' },
        { name: 'mailerliteIntegrationGroupPrefix', val: 'xc', fakeVal: 'Test prefix' },
    ],
    ruckusFields: [
        { name: 'ruckusIntegrationControllerAddress', val: 'https://ruckus.com', fakeVal: 'https://test.test' },
        { name: 'ruckusIntegrationUsername', val: 'username', fakeVal: 'test' },
        { name: 'ruckusIntegrationPassword', val: 'password', fakeVal: 'test' },
    ]
};

contextLoginToSystem();

context('Settings Page', function () {
    beforeEach(function () {
        cy.viewport('macbook-11');
        cy.restoreLocalStorage();
    });
    afterEach(() => {
        cy.saveLocalStorage();
    });

    describe('Profile settings', function () {

        it('Going to Profile Settings', () => {
            cy.get('[data-cy="linkSettings"]')
                .click({force: true})
            cy.get('[data-cy="settingsPage"]')
                .find('[href="/settings/profile"]')
                .click({force: true}).wait(1000)
        });

        it('Clear all fields', () => {
            testPayload.profileFields.map(field => {
                clearFields(`[data-cy="${field.name}"]`);
            });
        });

        it('Try to save empty form', () => {
            cy.get('[data-cy="companyProfileSave"]')
                .click({force: true}).wait(1000)
        });

        it('Check for validation errors', () => {
            cy.get('[data-cy="companyProfileForm"]')
                .find('.errorText').its('length').should('be.gt', 4)
        });

        it('Fill all fields with fake data and save', () => {
            testPayload.profileFields.map(field => {
                fillingFields(`[data-cy="${field.name}"]`, field.fakeVal || 'Test val');
            });
            cy.get('[data-cy="companyProfileSave"]')
                .click({force: true}).wait(1000)
        });

        it('Reload page and check saved data', () => {
            cy.reload().wait(1000);
            testPayload.profileFields.map(field => {
                cy.get(`[data-cy="${field.name}"]`).invoke('val').should(val => {
                    expect(val).to.eq(field.fakeVal || 'Test val');
                })
            });
        });

        it('Fill all fields with real data and save', () => {
            testPayload.profileFields.map(field => {
                fillingFields(`[data-cy="${field.name}"]`, field.val);
            });
            cy.get('[data-cy="companyProfileSave"]')
                .click({force: true}).wait(1000)
        });

        it('Reload page and check saved data', () => {
            cy.reload().wait(1000);
            testPayload.profileFields.map(field => {
                cy.get(`[data-cy="${field.name}"]`).invoke('val').should(val => {
                    expect(val).to.eq(field.val);
                })
            });
        });

    });

    describe('Profile language settings', function () {
        
        it('Going to Profile Settings', () => {
            cy.get('[data-cy="linkSettings"]')
                .click({force: true})
            cy.get('[data-cy="settingsPage"]')
                .find('[href="/settings/profile"]')
                .click({force: true}).wait(1000)
        });
        
        it('Get Current Language', () => {
            cy.get('[data-cy="profileLocaleSelect"]').invoke('val').then(val => {
                testPayload.profileCurrentLanguage = val;
            });
        });
        
        it('Change Language', () => {
            cy.get('[data-cy="profileLocaleSelectOption"]').each(($el) => {
                cy.wrap($el).invoke('val').then(val => {
                    if (testPayload.profileCurrentLanguage !== val) {
                        cy.get('[data-cy="profileLocaleSelect"]').select(val, { force: true });
                        testPayload.profileChangedLanguage = val;
                    }
                });
            });
            cy.get('[data-cy="profileLocaleSave"]')
                .click({force: true}).wait(1000)
        });
        
        it('Check if language changed and saved', () => {
            cy.reload().wait(1000);
            cy.get('[data-cy="profileLocaleSelect"]').invoke('val').should(val => {
                expect(val).to.eq(testPayload.profileChangedLanguage);
            })
        });
        
        it('Change Language back', () => {
            cy.get('[data-cy="profileLocaleSelect"]').select(testPayload.profileCurrentLanguage, { force: true });
            cy.get('[data-cy="profileLocaleSave"]')
                .click({force: true}).wait(1000)
        });
        
        it('Check if language changed back and saved', () => {
            cy.reload().wait(1000);
            cy.get('[data-cy="profileLocaleSelect"]').invoke('val').should(val => {
                expect(val).to.eq(testPayload.profileCurrentLanguage );
            })
        });

    });

    describe('MailerLite settings', function () {

        it('Going to MailerLite Settings', () => {
            cy.get('[data-cy="linkSettings"]')
                .click({force: true})
            cy.get('[data-cy="settingsPage"]')
                .find('[href="/settings/mailerlite"]')
                .click({force: true}).wait(1000)
        });

        it('Clear all fields', () => {
            testPayload.mailerliteFields.map(field => {
                clearFields(`[data-cy="${field.name}"]`);
            });
        });

        it('Try to save empty form', () => {
            cy.get('[data-cy="mailerliteIntegrationSave"]')
                .click({force: true}).wait(1000)
        });

        it('Check for validation errors', () => {
            cy.get('[data-cy="mailerliteIntegrationForm"]')
                .find('.errorText').its('length').should('be.gt', 2)
        });

        it('Try to test empty form', () => {
            cy.get('[data-cy="mailerliteIntegrationTest"]')
                .click({force: true}).wait(1000)
        });

        it('Check for validation errors', () => {
            cy.get('[data-cy="mailerliteIntegrationForm"]')
                .find('.errorText').its('length').should('be.gt', 2)
        });

        it('Fill all fields with fake data and save', () => {
            testPayload.mailerliteFields.map(field => {
                fillingFields(`[data-cy="${field.name}"]`, field.fakeVal || 'Test val');
            });
            cy.get('[data-cy="mailerliteIntegrationSave"]')
                .click({force: true}).wait(1000)
        });

        it('Reload page and check saved data', () => {
            cy.reload().wait(1000);
            testPayload.mailerliteFields.map(field => {
                cy.get(`[data-cy="${field.name}"]`).invoke('val').should(val => {
                    expect(val).to.eq(field.fakeVal || 'Test val');
                })
            });
        });

        it('Fill all fields with real data and save', () => {
            testPayload.mailerliteFields.map(field => {
                fillingFields(`[data-cy="${field.name}"]`, field.val);
            });
            cy.get('[data-cy="mailerliteIntegrationSave"]')
                .click({force: true}).wait(1000)
        });

        it('Reload page and check saved data', () => {
            cy.reload().wait(1000);
            testPayload.mailerliteFields.map(field => {
                cy.get(`[data-cy="${field.name}"]`).invoke('val').should(val => {
                    expect(val).to.eq(field.val);
                })
            });
        });

        it('Test MailerLite credentials', () => {
            cy.get('[data-cy="mailerliteIntegrationTest"]')
                .click({force: true}).wait(1000)
        });

        it('Check for test MailerLite credentials message', () => {
            cy.get('[data-cy="mailerliteIntegrationForm"]')
                .find('.statusBlock').its('length').should('be.gt', 0)
        });

    });

    describe('Ruckus settings', function () {

        it('Going to Ruckus Settings', () => {
            cy.get('[data-cy="linkSettings"]')
                .click({force: true})
            cy.get('[data-cy="settingsPage"]')
                .find('[href="/settings/ruckus"]')
                .click({force: true}).wait(1000)
        });

        it('Clear all fields', () => {
            testPayload.ruckusFields.map(field => {
                clearFields(`[data-cy="${field.name}"]`);
            });
        });

        it('Try to save empty form', () => {
            cy.get('[data-cy="ruckusIntegrationSave"]')
                .click({force: true}).wait(1000)
        });

        it('Check for validation errors', () => {
            cy.get('[data-cy="ruckusIntegrationForm"]')
                .find('.errorText').its('length').should('be.gt', 2)
        });

        it('Try to test empty form', () => {
            cy.get('[data-cy="ruckusIntegrationTest"]')
                .click({force: true}).wait(1000)
        });

        it('Check for validation errors', () => {
            cy.get('[data-cy="ruckusIntegrationForm"]')
                .find('.errorText').its('length').should('be.gt', 2)
        });

        it('Fill all fields with fake data and save', () => {
            testPayload.ruckusFields.map(field => {
                fillingFields(`[data-cy="${field.name}"]`, field.fakeVal || 'Test val');
            });
            cy.get('[data-cy="ruckusIntegrationSave"]')
                .click({force: true}).wait(1000)
        });

        it('Reload page and check saved data', () => {
            cy.reload().wait(1000);
            testPayload.ruckusFields.map(field => {
                cy.get(`[data-cy="${field.name}"]`).invoke('val').should(val => {
                    expect(val).to.eq(field.fakeVal || 'Test val');
                })
            });
        });

        it('Fill all fields with real data and save', () => {
            testPayload.ruckusFields.map(field => {
                fillingFields(`[data-cy="${field.name}"]`, field.val);
            });
            cy.get('[data-cy="ruckusIntegrationSave"]')
                .click({force: true}).wait(1000)
        });

        it('Reload page and check saved data', () => {
            cy.reload().wait(1000);
            testPayload.ruckusFields.map(field => {
                cy.get(`[data-cy="${field.name}"]`).invoke('val').should(val => {
                    expect(val).to.eq(field.val);
                })
            });
        });

        it('Test ruckus connection', () => {
            cy.get('[data-cy="ruckusIntegrationTest"]')
                .click({force: true}).wait(1000)
        });

        it('Check for test connection message', () => {
            cy.get('[data-cy="ruckusIntegrationForm"]')
                .find('.statusBlock').its('length').should('be.gt', 0)
        });

    });


});