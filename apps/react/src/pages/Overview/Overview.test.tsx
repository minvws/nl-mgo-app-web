import { useOnboardingSeen } from '$/hooks';
import { useHealthcareOrganizationsStore } from '$/store';
import { removeUserMock, setAuthStateAuthenticated } from '$test/auth';
import { healthcareOrganizationDTO } from '$test/data';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { faker } from '@faker-js/faker';
import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Overview } from './Overview';

test('overview', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();

    setupApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByText('Goedemorgen, Wendy')).toBeInTheDocument();
});

test('can logout', () => {
    setAuthStateAuthenticated();
    setupWithAppProviders(<Overview />);

    fireEvent.click(screen.getByRole('button', { name: /uitloggen/i }));

    expect(removeUserMock).toHaveBeenCalled();
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
