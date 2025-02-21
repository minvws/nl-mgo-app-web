import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
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

    let state = useOrganizationsStore.getState();
    expect(state.organizations.length).toBe(0);

    const listItem = await screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    await user.click(listItemButton);

    state = useOrganizationsStore.getState();
    expect(state.organizations.length).toBe(1);
    expect(mockNavigate).toBeCalled();
});

test('clicking an already added organization does not change the state, but does navigate', async () => {
    const user = userEvent.setup();
    const { addOrganization } = useOrganizationsStore.getState();
    const organization = faker.custom.healthcareOrganization();
    addOrganization(organization);

    setupWithAppProviders(<SearchResults searchResults={[organization]} />);

    let state = useOrganizationsStore.getState();
    expect(state.organizations.length).toBe(1);

    const listItem = await screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    await user.click(listItemButton);

    state = useOrganizationsStore.getState();
    expect(state.organizations.length).toBe(1);
    expect(mockNavigate).toBeCalled();
});

test('pagination adds extra items and dissappears when there are not items left', async () => {
    const data = times(RESULTS_PER_PAGE + 1, () => faker.custom.healthcareOrganization());

    const user = userEvent.setup();
    setupWithAppProviders(<SearchResults searchResults={data} />);

    expect(await screen.getAllByRole('listitem').length).toBe(15);

    const button = await screen.getByRole('button', {
        name: appMessage('add_organization.load_more'),
    });
    expect(button).toBeVisible();
    await user.click(button);

    expect(await screen.getAllByRole('listitem').length).toBeGreaterThan(15);
    expect(
        await screen.queryByRole('button', {
            name: appMessage('add_organization.load_more'),
        })
    ).not.toBeInTheDocument();
});
