import { type Page } from '@playwright/test';

/**
 * This function mocks the login process by setting the user info in local storage.
 * NOTE: This only works for as long as that authentication is not yet validated by the backend.
 * Call this function at the start of your test.
 */
export async function mockLogin(page: Page) {
    await page.addInitScript(() => {
        window.sessionStorage.setItem(
            'mgo-userinfo',
            JSON.stringify({
                reference_pseudonym: {
                    rid: '00000000000000000',
                },
                person: {
                    age: 42,
                    name: {
                        first_name: 'Testy',
                        prefix: 'Mr',
                        last_name: 'Testerson',
                        initials: 'T.T.',
                        full_name: 'Testy Tersterson',
                    },
                },
            })
        );
    });
}
