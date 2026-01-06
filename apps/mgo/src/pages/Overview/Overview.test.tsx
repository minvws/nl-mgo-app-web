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

vi.mock('$/hooks/useFailedHealthQueries/useFailedHealthQueries', () => ({
    useFailedHealthQueries: () => ['query-1', 'query-2'],
}));

const hoisted = vi.hoisted(() => ({
    useHealthCategoriesQuery:
        vi.fn<
            (typeof import('$/hooks/useHealthCategoriesQuery/useHealthCategoriesQuery'))['useHealthCategoriesQuery']
        >(),
    useRetryQuery: vi.fn(),
}));

vi.mock('$/hooks/useRetryQuery/useRetryQuery', () => ({
    useRetryQuery: hoisted.useRetryQuery,
}));

beforeEach(() => {
    (useAuth as MockedFunction<typeof useAuth>).mockImplementation(() =>
        faker.custom.authState({ isAuthenticated: true })
    );
});

test('overview should show empty state', () => {
    hoisted.useRetryQuery.mockImplementation(() => ({
        retry: vi.fn(),
        isRetrying: false,
    }));

    const { setOnboardingSeen } = useOnboardingSeen();
    setOnboardingSeen();

    setupApp({ initialEntries: ['/overzicht'] });

    expect(screen.getByText(appMessage('overview.heading'))).toBeInTheDocument();
    expect(screen.getByText(appMessage('common.no_organizations_heading'))).toBeInTheDocument();
});

test('should show the health categories if there are organizations', () => {
    hoisted.useRetryQuery.mockImplementation(() => ({
        retry: vi.fn(),
        isRetrying: false,
    }));

    const organizationName = faker.company.name();
    const { addOrganization } = useStore.getState();
    addOrganization(faker.custom.healthcareOrganization({ name: organizationName }));

    setupWithAppProviders(<Overview />);

    expect(screen.getByText(appMessage('hc_medication.heading'))).toBeInTheDocument();
});

test('clicking retry calls retry with failed queries', async () => {
    const retry = vi.fn();

    hoisted.useRetryQuery.mockImplementation(() => ({
        retry,
        isRetrying: false,
    }));

    const { user } = setupWithAppProviders(<Overview />);

    const button = screen.getByRole('button', {
        name: appMessage('common.try_again'),
    });

    await user.click(button);

    expect(retry).toHaveBeenCalledTimes(1);
    expect(retry).toHaveBeenCalledWith(['query-1', 'query-2']);
});
