import { getLoadService, type LoadService } from '$/services/load/load';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test';
import { flushCallStack } from '@minvws/mgo-utils';
import { screen } from '@testing-library/react';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { AddOrganization } from './AddOrganization';
import { submitSearchForm } from './testHelpers';

vi.mock('$/services/load/load');

const mockSearch = getLoadService().search as MockedFunction<LoadService['search']>;

afterEach(() => {
    vi.restoreAllMocks();
});

test('show loading state', async () => {
    mockSearch.mockImplementationOnce(() => new Promise(vi.fn()));
    const { user } = setupWithAppProviders(<AddOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    expect(screen.getByText(appMessage('organization_search.searching'))).toBeVisible();
});

test('no results found', async () => {
    mockSearch.mockResolvedValueOnce([]);
    const { user } = setupWithAppProviders(<AddOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });
    await flushCallStack();
    expect(
        screen.getByRole('heading', {
            name: appMessage('organization_search.no_results_found_heading'),
        })
    ).toBeVisible();
});

test('results found', async () => {
    mockSearch.mockResolvedValueOnce([faker.custom.healthcareOrganization()]);
    const { user } = setupWithAppProviders(<AddOrganization />);
    await submitSearchForm(user, { name: faker.word.sample(), city: faker.word.sample() });

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(1);
});
