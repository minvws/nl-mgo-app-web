import { useParamsData } from '$/routing';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { Organization } from './Organization';

const mockUseParamsData = useParamsData as MockedFunction<typeof useParamsData>;

vi.mock('$/routing/useParamsData/useParamsData');

const hoisted = vi.hoisted(() => ({
    useRetryQuery: vi.fn(),
    useFailedHealthQueries: vi.fn(),
}));

vi.mock('$/hooks/useFailedHealthQueries/useFailedHealthQueries', () => ({
    useFailedHealthQueries: hoisted.useFailedHealthQueries,
}));

vi.mock('$/hooks/useRetryQuery/useRetryQuery', () => ({
    useRetryQuery: hoisted.useRetryQuery,
}));

test('healthcare organization shows details about the organization', () => {
    hoisted.useRetryQuery.mockImplementation(() => ({
        retry: vi.fn(),
        isRetrying: false,
    }));

    hoisted.useFailedHealthQueries.mockReturnValue(() => []);

    const organization = faker.custom.healthcareOrganization();

    mockUseParamsData.mockImplementationOnce(() => ({
        organization,
        healthCategory: undefined,
        resource: undefined,
    }));

    setupWithAppProviders(<Organization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        appMessage('organization.heading', { organizationName: organization.name })
    );
});

test('healthcare organization shows a message if the organization could not be found', async () => {
    hoisted.useRetryQuery.mockImplementation(() => ({
        retry: vi.fn(),
        isRetrying: false,
    }));

    mockUseParamsData.mockImplementationOnce(() => ({
        organization: undefined,
        healthCategory: undefined,
        resource: undefined,
    }));

    setupWithAppProviders(<Organization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        appMessage('organization.not_found_heading')
    );
});

test('isRetrying makes erronotice visible', async () => {
    const retry = vi.fn();

    hoisted.useRetryQuery.mockImplementation(() => ({
        retry,
        isRetrying: true,
    }));

    hoisted.useFailedHealthQueries.mockReturnValue(() => []);

    const organization = faker.custom.healthcareOrganization();

    mockUseParamsData.mockImplementationOnce(() => ({
        organization,
        healthCategory: undefined,
        resource: undefined,
    }));

    setupWithAppProviders(<Organization />);

    const button = screen.getByRole('button', {
        name: appMessage('common.try_again'),
    });

    expect(button).toBeVisible();
});

test('clicking retry calls retry with failed queries', async () => {
    const retry = vi.fn();
    const mockFailedQueries = ['query-1', 'query-2'];

    hoisted.useRetryQuery.mockImplementation(() => ({
        retry,
        isRetrying: false,
    }));

    const organization = faker.custom.healthcareOrganization();

    mockUseParamsData.mockImplementationOnce(() => ({
        organization,
        healthCategory: undefined,
        resource: undefined,
    }));

    hoisted.useFailedHealthQueries.mockReturnValue(mockFailedQueries);

    const { user } = setupWithAppProviders(<Organization />);

    const button = screen.getByRole('button', {
        name: appMessage('common.try_again'),
    });

    await user.click(button);

    expect(retry).toHaveBeenCalledTimes(1);
    expect(retry).toHaveBeenCalledWith(mockFailedQueries);
});
