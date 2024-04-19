import * as LocationApi from '$/api/location';
import { type OrganisationSearchResponse } from '$/types/Organisation';
import { setAuthStateAuthenticated } from '$test/auth';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { faker } from '@faker-js/faker';
import { fireEvent, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { AddHealthcareProvider } from './AddHealthcareProvider';
import { submitSearchForm } from './testHelpers';

vi.mock('$/api/location', () => ({
    search: () =>
        Promise.resolve<OrganisationSearchResponse>({
            organizations: [
                {
                    display_name: faker.company.name(),
                    identification_type: faker.lorem.slug(),
                    identification_value: faker.lorem.slug(),
                    active: faker.datatype.boolean(),
                    addresses: [
                        {
                            active: faker.datatype.boolean(),
                            address: faker.location.streetAddress(),
                            postalcode: faker.location.zipCode('####??'),
                            city: faker.location.city(),
                        },
                    ],
                    names: [],
                    types: [],
                },
            ],
        }),
}));

afterEach(() => {
    vi.restoreAllMocks();
});

test('show spinner', async () => {
    vi.spyOn(LocationApi, 'search').mockImplementationOnce(() => new Promise(vi.fn()));
    const { user } = setupWithAppProviders(<AddHealthcareProvider />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    expect(screen.getByText('Zorgverleners aan het zoeken...')).toBeVisible();
});

test('no results found', async () => {
    vi.spyOn(LocationApi, 'search').mockResolvedValueOnce({ organizations: [] });
    const { user } = setupWithAppProviders(<AddHealthcareProvider />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    expect(screen.getByText('Geen zorgverleners gevonden.')).toBeVisible();
});

test('results found', async () => {
    const { user } = setupWithAppProviders(<AddHealthcareProvider />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(1);
});

test('error', async () => {
    vi.spyOn(LocationApi, 'search').mockRejectedValueOnce('error');
    const { user } = setupWithAppProviders(<AddHealthcareProvider />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    expect(await screen.getByRole('alert')).toBeVisible();
});

test('back button', () => {
    setAuthStateAuthenticated();
    setupApp({ initialEntries: ['/welkom', '/hoe-werkt-het', '/zorgverlener-toevoegen'] });

    fireEvent.click(screen.getByText(/vorige/i));

    expect(screen.getByRole('heading')).toHaveTextContent('Zo gebruikt de website jouw gegevens');
});
