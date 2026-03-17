import { useStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { SearchResults as OrgSearchResults, type Organization } from '@minvws/mgo-org-search';
import { screen, within } from '@testing-library/react';
import { times } from 'lodash';
import { expect, test } from 'vitest';
import { RESULTS_PER_PAGE, ResultsList } from './ResultsList';

function createSearchResults(items: Organization[] = [faker.custom.organizationSearchResult()]) {
    return {
        count: items.length,
        hits: items.map((document) => ({
            id: document.id,
            document,
            score: 1,
        })),
    } as OrgSearchResults;
}

function createDataServiceEndpoints(items: Organization[] = []) {
    return items.reduce(
        (acc, item) => {
            item.dataServices?.forEach((dataService) => {
                acc[dataService.resourceEndpoint] = faker.internet.url();
                acc[dataService.authEndpoint] = faker.internet.url();
                acc[dataService.tokenEndpoint] = faker.internet.url();
            });
            return acc;
        },
        {} as Record<string, string>
    );
}

test('shows already added message and disables the button', async () => {
    const organization = faker.custom.healthcareOrganization();
    useStore.setState({
        organizations: [organization],
    });

    const organizationSearchResult = faker.custom.organizationSearchResult({
        id: organization.id,
    });

    const results = createSearchResults([organizationSearchResult]);
    const dataServiceEndpoints = createDataServiceEndpoints([organizationSearchResult]);
    const { user } = setupWithAppProviders(
        <ResultsList searchResults={results} dataServiceEndpoints={dataServiceEndpoints} />
    );

    const state = useStore.getState();
    expect(state.organizations.length).toBe(1);

    const listItem = screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    within(listItem).getByText(appMessage('add_organization.already_added'));

    await user.click(listItemButton);

    const dialog = screen.queryByRole('alertdialog');
    expect(dialog).not.toBeInTheDocument();
});

test('shows not participating message and disables the button', async () => {
    const organization = faker.custom.organizationSearchResult();
    organization.dataServices = undefined;

    const results = createSearchResults([organization]);
    const dataServiceEndpoints = createDataServiceEndpoints([organization]);
    const { user } = setupWithAppProviders(
        <ResultsList searchResults={results} dataServiceEndpoints={dataServiceEndpoints} />
    );

    const listItem = screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    within(listItem).getByText(appMessage('add_organization.not_participating'));

    await user.click(listItemButton);

    const dialog = screen.queryByRole('alertdialog');
    expect(dialog).not.toBeInTheDocument();
});

test('shows unknown as title when organization name is missing', () => {
    const organization = faker.custom.organizationSearchResult();
    organization.name = undefined;
    const results = createSearchResults([organization]);
    const dataServiceEndpoints = createDataServiceEndpoints([organization]);
    setupWithAppProviders(
        <ResultsList searchResults={results} dataServiceEndpoints={dataServiceEndpoints} />
    );

    expect(screen.getByRole('listitem')).toHaveTextContent(appMessage('common.unknown'));
});

test('opens confirm dialog when clicking a supported organization', async () => {
    const organization = faker.custom.organizationSearchResult();
    organization.name = faker.company.name();
    const results = createSearchResults([organization]);
    const dataServiceEndpoints = createDataServiceEndpoints([organization]);
    const { user } = setupWithAppProviders(
        <ResultsList searchResults={results} dataServiceEndpoints={dataServiceEndpoints} />
    );

    const listItem = screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');
    await user.click(listItemButton);

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeVisible();
    expect(within(dialog).getByText(organization.name, { exact: false })).toBeVisible();
});

test('pagination adds extra items and disappears when there are no items left', async () => {
    const documents = times(RESULTS_PER_PAGE + 1, () => faker.custom.organizationSearchResult());
    const results = createSearchResults(documents);
    const dataServiceEndpoints = createDataServiceEndpoints(documents);
    const { user } = setupWithAppProviders(
        <ResultsList searchResults={results} dataServiceEndpoints={dataServiceEndpoints} />
    );

    expect(screen.getAllByRole('listitem').length).toBe(RESULTS_PER_PAGE);

    const button = screen.getByRole('button', {
        name: appMessage('add_organization.load_more'),
    });
    expect(button).toBeVisible();
    await user.click(button);

    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(RESULTS_PER_PAGE);
    expect(
        await screen.queryByRole('button', {
            name: appMessage('add_organization.load_more'),
        })
    ).not.toBeInTheDocument();
});
