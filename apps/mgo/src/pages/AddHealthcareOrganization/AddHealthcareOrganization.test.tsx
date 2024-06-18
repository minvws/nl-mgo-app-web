import * as LocationApi from '$/api/location';
import { type OrganisationSearchResponse } from '$/types/Organisation';
import { setupWithAppProviders, flushCallStack } from '$test/helpers';
import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { AddHealthcareOrganization } from './AddHealthcareOrganization';
import { submitSearchForm } from './testHelpers';
import { healthcareOrganizationDTO } from '$test/data';

vi.mock('$/api/location', () => ({
    search: () =>
        Promise.resolve<OrganisationSearchResponse>({
            organizations: [healthcareOrganizationDTO()],
        }),
}));

afterEach(() => {
    vi.restoreAllMocks();
});

test('show loading state', async () => {
    vi.spyOn(LocationApi, 'search').mockImplementationOnce(() => new Promise(vi.fn()));
    const { user } = setupWithAppProviders(<AddHealthcareOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    expect(screen.getByText('Zorgaanbieders aan het zoeken...')).toBeVisible();
});

test('no results found', async () => {
    vi.spyOn(LocationApi, 'search').mockResolvedValueOnce({ organizations: [] });
    const { user } = setupWithAppProviders(<AddHealthcareOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });
    await flushCallStack();
    expect(
        screen.getByRole('heading', {
            name: 'Geen zorgaanbieders gevonden',
        })
    ).toBeVisible();
});

test('results found', async () => {
    const { user } = setupWithAppProviders(<AddHealthcareOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(1);
});
