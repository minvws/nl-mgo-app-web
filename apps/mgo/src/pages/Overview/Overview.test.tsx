import { useOnboardingSeen } from '$/hooks';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setAuthStateAuthenticated, setupApp, setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Overview } from './Overview';

test('overview should show empty state', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen(true);
    setAuthStateAuthenticated();

    setupApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByText(appMessage('overview.heading'))).toBeInTheDocument();
    expect(screen.getByText(appMessage('common.no_organizations_heading'))).toBeInTheDocument();
});

test('should show the health categories if there are organizations', () => {
    const organizationName = faker.company.name();
    const { addOrganization } = useOrganizationsStore.getState();
    addOrganization(faker.custom.healthcareOrganization({ name: organizationName }));

    setAuthStateAuthenticated();
    setupWithAppProviders(<Overview />);

    expect(screen.getByText(appMessage('hc_medication.heading'))).toBeInTheDocument();
});
