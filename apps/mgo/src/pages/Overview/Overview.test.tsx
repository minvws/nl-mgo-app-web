import { useOnboardingSeen } from '$/hooks';
import { useHealthcareOrganizationsStore } from '$/store';
import { setAuthStateAuthenticated } from '$test/helpers';
import { healthcareOrganizationDTO } from '$test/data';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Overview } from './Overview';

test('overview', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();

    setupApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByText('Goedemorgen, Wendy')).toBeInTheDocument();
});

test('should show the healthcare organizations', () => {
    const organizationName = faker.company.name();
    const { addHealthcareOrganization } = useHealthcareOrganizationsStore.getState();
    addHealthcareOrganization(healthcareOrganizationDTO({ display_name: organizationName }));

    setAuthStateAuthenticated();
    setupWithAppProviders(<Overview />);

    screen.getByRole('link', {
        name: new RegExp(organizationName),
    });
});
