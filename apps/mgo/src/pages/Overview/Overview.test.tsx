import { useAuth } from '$/auth';
import { useOnboardingSeen } from '$/hooks';
import { useStore } from '$/store';
import { faker } from '$test/faker';
import { setupApp, setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { Overview } from './Overview';

vi.mock('$/auth');

beforeEach(() => {
    (useAuth as MockedFunction<typeof useAuth>).mockImplementation(() =>
        faker.custom.authState({ isAuthenticated: true })
    );
});

test('overview should show empty state', () => {
    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen();

    setupApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByText(appMessage('overview.heading'))).toBeInTheDocument();
    expect(screen.getByText(appMessage('common.no_organizations_heading'))).toBeInTheDocument();
});

test('should show the health categories if there are organizations', () => {
    const organizationName = faker.company.name();
    const { addOrganization } = useStore.getState();
    addOrganization(faker.custom.healthcareOrganization({ name: organizationName }));

    setupWithAppProviders(<Overview />);

    expect(screen.getByText(appMessage('hc_medication.heading'))).toBeInTheDocument();
});
