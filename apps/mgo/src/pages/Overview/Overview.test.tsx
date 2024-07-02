import { useOnboardingSeen } from '$/hooks';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setAuthStateAuthenticated, setupApp, setupWithAppProviders, message } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Overview } from './Overview';

test('overview', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();

    setupApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByText(message('overview.heading'))).toBeInTheDocument();
});

test('should show the healthcare organizations', () => {
    const organizationName = faker.company.name();
    const { addOrganization } = useOrganizationsStore.getState();
    addOrganization(faker.custom.healthcareOrganization({ name: organizationName }));

    setAuthStateAuthenticated();
    setupWithAppProviders(<Overview />);

    screen.getByRole('link', {
        name: new RegExp(organizationName),
    });
});
