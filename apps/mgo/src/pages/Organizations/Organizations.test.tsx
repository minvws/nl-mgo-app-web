import { useOnboardingSeen } from '$/hooks';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import {
    setAuthStateAuthenticated,
    setupApp,
    setupWithAppProviders,
    message,
    flushCallStack,
} from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Organizations } from './Organizations';

test('overview should show empty state', async () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();

    setupApp({ initialEntries: ['/organisaties'] });

    await flushCallStack();
    expect(screen.getByText(message('organizations.heading'))).toBeInTheDocument();
    expect(screen.getByText(message('common.no_organizations_heading'))).toBeInTheDocument();
});

test('should show the healthcare organizations', () => {
    const organizationName = faker.company.name();
    const { addOrganization } = useOrganizationsStore.getState();
    addOrganization(faker.custom.healthcareOrganization({ name: organizationName }));

    setAuthStateAuthenticated();
    setupWithAppProviders(<Organizations />);

    screen.getByRole('link', {
        name: new RegExp(organizationName),
    });
});
