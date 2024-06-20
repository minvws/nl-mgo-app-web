import { useOnboardingSeen } from '$/hooks';
import { useHealthcareOrganizationsStore } from '$/store';
import { setAuthStateAuthenticated, setupApp, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Overview } from './Overview';
import { faker } from '$test/faker';

test('overview', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();

    setupApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByText('Goedemorgen, Wendy')).toBeInTheDocument();
});

test('should show the healthcare organizations', () => {
    const organizationName = faker.company.name();
    const { addOrganization } = useHealthcareOrganizationsStore.getState();
    addOrganization(faker.custom.healthcareOrganization({ name: organizationName }));

    setAuthStateAuthenticated();
    setupWithAppProviders(<Overview />);

    screen.getByRole('link', {
        name: new RegExp(organizationName),
    });
});
