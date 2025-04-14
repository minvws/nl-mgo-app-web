import { useAuth } from '$/auth';
import { useOnboardingSeen } from '$/hooks';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { flushCallStack } from '@minvws/mgo-mgo-utils';
import { screen } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { Organizations } from './Organizations';

vi.mock('$/auth');

beforeEach(() => {
    (useAuth as MockedFunction<typeof useAuth>).mockImplementation(() =>
        faker.custom.authState({ isAuthenticated: true })
    );
});

test('overview should show empty state', async () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);

    setupApp({ initialEntries: ['/organisaties'] });

    await flushCallStack();
    expect(screen.getByText(appMessage('organizations.heading'))).toBeInTheDocument();
    expect(screen.getByText(appMessage('common.no_organizations_heading'))).toBeInTheDocument();
});

test('should show the healthcare organizations', () => {
    const organizationName = faker.company.name();
    const { addOrganization } = useOrganizationsStore.getState();
    addOrganization(faker.custom.healthcareOrganization({ name: organizationName }));

    setupWithAppProviders(<Organizations />);

    screen.getByRole('link', {
        name: new RegExp(organizationName),
    });
});

test('should show the healthcare organization with an unknown label if the name is not defined', () => {
    const { addOrganization } = useOrganizationsStore.getState();
    addOrganization({
        ...faker.custom.healthcareOrganization(),
        name: undefined,
    });

    setupWithAppProviders(<Organizations />);

    screen.getByRole('link', {
        name: new RegExp(appMessage('common.unknown')),
    });
});
