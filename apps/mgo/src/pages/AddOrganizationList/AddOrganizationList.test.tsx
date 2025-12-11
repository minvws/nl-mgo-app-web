import { useAuth } from '$/auth';
import { useOnboardingSeen } from '$/hooks';
import { useStore } from '$/store';
import { faker } from '$test/faker';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { AddOrganizationList } from './AddOrganizationList';

vi.mock('$/auth');

const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

beforeEach(() => {
    mockUseAuth.mockImplementation(() => faker.custom.authState({ isAuthenticated: true }));
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen();
    useStore.setState({ organizations: [] });
});

test('shows added organizations', async () => {
    useStore.getState().addOrganization(faker.custom.healthcareOrganization());
    setupApp({ initialEntries: ['/zorgaanbieder-toevoegen/zorgaanbieders'] });
    const listItems = screen.getAllByTestId('organization-item');
    expect(listItems.length).toBe(1);
});

test('shows if there are no organizations', async () => {
    setupApp({ initialEntries: ['/zorgaanbieder-toevoegen/zorgaanbieders'] });
    expect(
        screen.getByRole('heading', {
            name: appMessage('add_organization_list.no_results_heading'),
        })
    ).toBeInTheDocument();
});

test('remove item from store', async () => {
    const user = userEvent.setup();
    const { addOrganization } = useStore.getState();
    addOrganization(faker.custom.healthcareOrganization());
    setupWithAppProviders(<AddOrganizationList />);
    let listItems = screen.getAllByTestId('organization-item');
    expect(listItems.length).toBe(1);
    const listItemButton = within(listItems[0]).getByRole('button');

    await user.click(listItemButton);

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeVisible();
    const button = within(dialog).getByRole('button', {
        name: appMessage('dialog.remove_organization_yes'),
    });
    await user.click(button);

    listItems = screen.queryAllByTestId('organization-item');
    expect(listItems.length).toBe(0);
});

test('do not remove item from store', async () => {
    const user = userEvent.setup();
    const { addOrganization } = useStore.getState();
    addOrganization(faker.custom.healthcareOrganization());
    setupWithAppProviders(<AddOrganizationList />);

    let listItems = screen.getAllByTestId('organization-item');
    const listItemButton = within(listItems[0]).getByRole('button');

    await user.click(listItemButton);

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeVisible();
    const button = within(dialog).getByRole('button', {
        name: appMessage('dialog.remove_organization_no'),
    });
    await user.click(button);

    listItems = screen.queryAllByTestId('organization-item');
    expect(listItems.length).toBe(1);
});
