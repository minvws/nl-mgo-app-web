import { useOnboardingSeen } from '$/hooks';
import { useHealthcareOrganizationsStore } from '$/store';
import { setAuthStateAuthenticated } from '$test/auth';
import { healthcareOrganizationDTO } from '$test/data';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { AddHealthcareOrganizationList } from './AddHealthcareOrganizationList';

test('render from store', async () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();
    const { addHealthcareOrganization } = useHealthcareOrganizationsStore.getState();
    addHealthcareOrganization(healthcareOrganizationDTO());

    setupApp({ initialEntries: ['/zorgaanbieder-toevoegen/zorgaanbieders'] });

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

    const dialog = await screen.getByRole('alertdialog');
    expect(dialog).toBeVisible();
    const button = await within(dialog).getByRole('button', {
        name: 'Ja, weglaten',
    });
    await user.click(button);

    expect(await screen.queryAllByRole('listitem').length).toBe(0);
});

test('do not remove item from store', async () => {
    const user = userEvent.setup();
    const { addHealthcareOrganization } = useHealthcareOrganizationsStore.getState();
    addHealthcareOrganization(healthcareOrganizationDTO());
    setupWithAppProviders(<AddHealthcareOrganizationList />);

    expect(await screen.getAllByRole('listitem').length).toBeGreaterThan(0);

    const listItem = await screen.getByRole('listitem');
    const listItemButton = await within(listItem).getByRole('button');

    await user.click(listItemButton);

    const dialog = await screen.getByRole('alertdialog');
    expect(dialog).toBeVisible();
    const button = await within(dialog).getByRole('button', {
        name: 'Nee, toch tonen',
    });
    await user.click(button);

    expect(await screen.queryAllByRole('listitem').length).toBeGreaterThan(0);
});
