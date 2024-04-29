import { useOnboardingSeen } from '$/hooks';
import { useHealthcareOrganizationsStore } from '$/store';
import { setAuthStateAuthenticated } from '$test/auth';
import { healthcareOrganizationDTO } from '$test/data';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { AddHealthcareOrganizationList } from './AddHealthcareOrganizationList';

test('render from store', async () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();
    const { addHealthcareOrganization } = useHealthcareOrganizationsStore.getState();
    addHealthcareOrganization(healthcareOrganizationDTO());

    setupApp({ initialEntries: ['/zorgverlener-toevoegen/zorgverleners'] });

    expect(await screen.getAllByRole('listitem').length).toBeGreaterThan(0);
});

test('remove item from store', async () => {
    const user = userEvent.setup();
    const { addHealthcareOrganization } = useHealthcareOrganizationsStore.getState();
    addHealthcareOrganization(healthcareOrganizationDTO());
    setupWithAppProviders(<AddHealthcareOrganizationList />);

    expect(await screen.getAllByRole('listitem').length).toBeGreaterThan(0);

    const listItem = await screen.getByRole('listitem');
    const listItemButton = await within(listItem).getByRole('button');

    await user.click(listItemButton);

    expect(await screen.queryAllByRole('listitem').length).toBe(0);
});

test('back button', () => {
    setAuthStateAuthenticated();
    setupApp({
        initialEntries: ['/zorgverlener-toevoegen', '/zorgverlener-toevoegen/zorgverleners'],
    });

    fireEvent.click(screen.getByText(/vorige/i));

    expect(
        screen.getByRole('heading', {
            level: 1,
        })
    ).toHaveTextContent('Voeg een zorgverlener toe');
});
