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
    useFailedHealthQueries: vi.fn(),
}));

vi.mock('$/hooks/useFailedHealthQueries/useFailedHealthQueries', () => ({
    useFailedHealthQueries: hoisted.useFailedHealthQueries,
}));

test('healthcare organization shows details about the organization', () => {
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

test('isRetrying makes errornotice visible', async () => {
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
