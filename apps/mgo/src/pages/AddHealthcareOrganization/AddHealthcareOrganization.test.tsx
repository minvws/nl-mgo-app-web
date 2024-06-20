import { search } from '$/api/load';
import { faker } from '$test/faker';
import { flushCallStack, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { type MockedFunction, afterEach, expect, test, vi } from 'vitest';
import { AddHealthcareOrganization } from './AddHealthcareOrganization';
import { submitSearchForm } from './testHelpers';

const mockSearch = search as MockedFunction<typeof search>;

vi.mock('$/api/load', () => ({ search: vi.fn() }));

afterEach(() => {
    vi.restoreAllMocks();
});

test('show loading state', async () => {
    mockSearch.mockImplementationOnce(() => new Promise(vi.fn()));
    const { user } = setupWithAppProviders(<AddHealthcareOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    expect(screen.getByText('Zorgaanbieders aan het zoeken...')).toBeVisible();
});

test('no results found', async () => {
    mockSearch.mockResolvedValueOnce({ organizations: [] });
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
    mockSearch.mockResolvedValueOnce({ organizations: [faker.custom.healthcareOrganizationDTO()] });
    const { user } = setupWithAppProviders(<AddHealthcareOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(1);
});
