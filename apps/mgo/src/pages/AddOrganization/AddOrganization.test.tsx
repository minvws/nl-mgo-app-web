import { search } from '$/api/load';
import { faker } from '$test/faker';
import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { type MockedFunction, afterEach, expect, test, vi } from 'vitest';
import { AddOrganization } from './AddOrganization';
import { submitSearchForm } from './testHelpers';

const mockSearch = search as MockedFunction<typeof search>;

vi.mock('$/api/load', () => ({ search: vi.fn() }));

afterEach(() => {
    vi.restoreAllMocks();
});

test('show loading state', async () => {
    mockSearch.mockImplementationOnce(() => new Promise(vi.fn()));
    const { user } = setupWithAppProviders(<AddOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    expect(screen.getByText(message('organization_search.searching'))).toBeVisible();
});

test('no results found', async () => {
    mockSearch.mockResolvedValueOnce({ organizations: [] });
    const { user } = setupWithAppProviders(<AddOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });
    await flushCallStack();
    expect(
        screen.getByRole('heading', {
            name: message('organization_search.no_results_found_heading'),
        })
    ).toBeVisible();
});

test('results found', async () => {
    mockSearch.mockResolvedValueOnce({ organizations: [faker.custom.healthcareOrganizationDTO()] });
    const { user } = setupWithAppProviders(<AddOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(1);
});
