import { useHealthcareOrganizationsStore } from '$/store';
import { type HealthcareOrganizationDTO } from '$/types/Organisation';
import { healthcareOrganizationDTO } from '$test/data';
import { setupWithAppProviders } from '$test/helpers';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { RESULTS_PER_PAGE, SearchResults } from './SearchResults';

const mockNavigate = vi.fn();
vi.mock('$/routing', () => ({
    useNavigate: () => mockNavigate,
}));

test('test add to store', async () => {
    const user = userEvent.setup();
    setupWithAppProviders(<SearchResults searchResults={[healthcareOrganizationDTO()]} />);

    let state = useHealthcareOrganizationsStore.getState();
    expect(state.healthcareOrganizations.length).toBe(0);

    const listItem = await screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    await user.click(listItemButton);

    state = useHealthcareOrganizationsStore.getState();
    expect(state.healthcareOrganizations.length).toBe(1);
    expect(mockNavigate).toBeCalled();
});

test('test navigate do not add to store', async () => {
    const user = userEvent.setup();
    const { addHealthcareOrganization } = useHealthcareOrganizationsStore.getState();
    addHealthcareOrganization(healthcareOrganizationDTO());

    setupWithAppProviders(
        <SearchResults
            searchResults={useHealthcareOrganizationsStore.getState().healthcareOrganizations}
        />
    );

    let state = useHealthcareOrganizationsStore.getState();
    expect(state.healthcareOrganizations.length).toBe(1);

    const listItem = await screen.getByRole('listitem');
    const listItemButton = within(listItem).getByRole('button');

    await user.click(listItemButton);

    state = useHealthcareOrganizationsStore.getState();
    expect(state.healthcareOrganizations.length).toBe(1);
    expect(mockNavigate).toBeCalled();
});

test('Test pagination', async () => {
    const data: HealthcareOrganizationDTO[] = [];
    for (let index = 0; index < RESULTS_PER_PAGE + 1; index++) {
        data.push(healthcareOrganizationDTO());
    }

    const user = userEvent.setup();
    setupWithAppProviders(<SearchResults searchResults={data} />);

    expect(await screen.getAllByRole('listitem').length).toBe(15);

    const button = await screen.getByRole('button', {
        name: 'Meer zorgaanbieders laden',
    });
    expect(button).toBeVisible();
    await user.click(button);

    expect(await screen.getAllByRole('listitem').length).toBeGreaterThan(15);
    expect(
        await screen.queryByRole('button', {
            name: 'Meer zorgaanbieders laden',
        })
    ).not.toBeInTheDocument();
});
