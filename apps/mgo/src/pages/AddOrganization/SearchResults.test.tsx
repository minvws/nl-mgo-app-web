import { useStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { times } from 'lodash';
import { expect, test, vi } from 'vitest';
import { RESULTS_PER_PAGE, SearchResults } from './SearchResults';

const mockNavigate = vi.fn();
vi.mock('$/routing', () => ({
    useNavigate: () => mockNavigate,
}));

test('adds organization to store on click', async () => {
    const user = userEvent.setup();
    setupWithAppProviders(
        <SearchResults searchResults={[faker.custom.healthcareOrganization()]} />
    );

    let state = useStore.getState();
    expect(state.organizations.length).toBe(0);

    const listItem = screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    await user.click(listItemButton);

    state = useStore.getState();
    expect(state.organizations.length).toBe(1);
    expect(mockNavigate).toBeCalled();
});

test('shows unknown label for organization without a name', async () => {
    setupWithAppProviders(
        <SearchResults
            searchResults={[
                {
                    ...faker.custom.healthcareOrganization(),
                    name: undefined,
                },
            ]}
        />
    );

    const listItem = screen.getByRole('listitem');
    const listItemHeading = within(listItem).getByRole('heading');
    expect(listItemHeading.textContent).toBe(appMessage('common.unknown'));
});

test('clicking an already added organization does not change the state, but does navigate', async () => {
    const user = userEvent.setup();
    const { addOrganization } = useStore.getState();
    const organization = faker.custom.healthcareOrganization();
    addOrganization(organization);

    setupWithAppProviders(<SearchResults searchResults={[organization]} />);

    let state = useStore.getState();
    expect(state.organizations.length).toBe(1);

    const listItem = screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    within(listItem).getByText(appMessage('add_organization.already_added'));

    await user.click(listItemButton);

    state = useStore.getState();
    expect(state.organizations.length).toBe(1);
    expect(mockNavigate).toBeCalled();
});

test('unsupported organizations do not contain an action', async () => {
    const organization = faker.custom.healthcareOrganization();
    organization.dataServices = [];

    setupWithAppProviders(<SearchResults searchResults={[organization]} />);

    const listItem = screen.getByRole('listitem');
    const listItemButton = await within(listItem).queryByRole('button');

    expect(listItemButton).toBe(null);

    within(listItem).getByText(appMessage('add_organization.not_participating'));
});

test('pagination adds extra items and dissappears when there are not items left', async () => {
    const data = times(RESULTS_PER_PAGE + 1, () => faker.custom.healthcareOrganization());

    const user = userEvent.setup();
    setupWithAppProviders(<SearchResults searchResults={data} />);

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
