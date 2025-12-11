import { useStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { SearchResults as OrgSearchResults, SearchResultDocument } from '@minvws/mgo-org-search';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { times } from 'lodash';
import { expect, test, vi } from 'vitest';
import { RESULTS_PER_PAGE, SearchResults } from './SearchResults';

function mockSearchResultDocument(): SearchResultDocument {
    return {
        id: faker.string.uuid(),
        displayName: faker.company.name(),
        addressLine: faker.location.streetAddress(),
        city: faker.location.city(),
    } as SearchResultDocument;
}

function mockSearchResults(documents: SearchResultDocument[] = [mockSearchResultDocument()]) {
    return {
        count: 1,
        hits: documents.map((document) => ({
            id: document.id,
            document,
            score: 1,
        })),
    } as OrgSearchResults;
}

const mockNavigate = vi.fn();
vi.mock('$/routing', () => ({
    useNavigate: () => mockNavigate,
}));

test.skip('adds organization to store when confirming the dialog', async () => {
    const user = userEvent.setup();
    const results = mockSearchResults();
    setupWithAppProviders(<SearchResults searchResults={results} />);

    let state = useStore.getState();
    expect(state.organizations.length).toBe(0);

    const listItem = screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    await user.click(listItemButton);

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeVisible();
    const button = within(dialog).getByRole('button', {
        name: appMessage('dialog.add_organization_yes'),
    });
    await user.click(button);

    state = useStore.getState();
    expect(state.organizations.length).toBe(1);
    expect(mockNavigate).toBeCalled();
});

test.skip('show if an organization was already added and disabled the button', async () => {
    const { addOrganization } = useStore.getState();
    const organization = faker.custom.healthcareOrganization();
    addOrganization(organization);

    const results = mockSearchResults();
    const { user } = setupWithAppProviders(<SearchResults searchResults={results} />);

    const state = useStore.getState();
    expect(state.organizations.length).toBe(1);

    const listItem = screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    within(listItem).getByText(appMessage('add_organization.already_added'));

    await user.click(listItemButton);

    const dialog = screen.queryByRole('alertdialog');
    expect(dialog).not.toBeInTheDocument();
});

test.skip('shows if a organization can not be added and disables the button', async () => {
    const organization = faker.custom.healthcareOrganization();
    organization.dataServices = [];

    const results = mockSearchResults();
    const { user } = setupWithAppProviders(<SearchResults searchResults={results} />);

    const listItem = screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    within(listItem).getByText(appMessage('add_organization.not_participating'));

    await user.click(listItemButton);

    const dialog = screen.queryByRole('alertdialog');
    expect(dialog).not.toBeInTheDocument();
});

test.skip('pagination adds extra items and dissappears when there are not items left', async () => {
    const documents = times(RESULTS_PER_PAGE + 1, () => mockSearchResultDocument());
    const results = mockSearchResults(documents);
    const user = userEvent.setup();
    setupWithAppProviders(<SearchResults searchResults={results} />);

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
