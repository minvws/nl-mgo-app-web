import { useAuth } from '$/auth';
import { useOnboardingSeen } from '$/hooks';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { AddOrganizationList } from './AddOrganizationList';

vi.mock('$/auth');

const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

test('render from store', async () => {
    mockUseAuth.mockImplementation(() => faker.custom.authState({ isAuthenticated: true }));
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);

    const { addOrganization } = useOrganizationsStore.getState();
    addOrganization(faker.custom.healthcareOrganization());

    setupApp({ initialEntries: ['/zorgaanbieder-toevoegen/zorgaanbieders'] });

    expect(await screen.getAllByRole('listitem').length).toBeGreaterThan(0);
});

test('remove item from store', async () => {
    const user = userEvent.setup();
    const { addOrganization } = useOrganizationsStore.getState();
    addOrganization(faker.custom.healthcareOrganization());
    setupWithAppProviders(<AddOrganizationList />);

    expect(await screen.getAllByRole('listitem').length).toBeGreaterThan(0);

    const listItem = await screen.getByRole('listitem');
    const listItemButton = await within(listItem).getByRole('button');

    await user.click(listItemButton);

    const dialog = await screen.getByRole('alertdialog');
    expect(dialog).toBeVisible();
    const button = await within(dialog).getByRole('button', {
        name: appMessage('dialog.remove_organization_yes'),
    });
    await user.click(button);

    expect(await screen.queryAllByRole('listitem').length).toBe(0);
});

test('do not remove item from store', async () => {
    const user = userEvent.setup();
    const { addOrganization } = useOrganizationsStore.getState();
    addOrganization(faker.custom.healthcareOrganization());
    setupWithAppProviders(<AddOrganizationList />);

    expect(await screen.getAllByRole('listitem').length).toBeGreaterThan(0);

    const listItem = await screen.getByRole('listitem');
    const listItemButton = await within(listItem).getByRole('button');

    await user.click(listItemButton);

    const dialog = await screen.getByRole('alertdialog');
    expect(dialog).toBeVisible();
    const button = await within(dialog).getByRole('button', {
        name: appMessage('dialog.remove_organization_no'),
    });
    await user.click(button);

    expect(await screen.queryAllByRole('listitem').length).toBeGreaterThan(0);
});
