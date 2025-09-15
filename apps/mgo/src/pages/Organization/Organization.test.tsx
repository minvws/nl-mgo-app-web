import { useParamsData } from '$/routing';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { Organization } from './Organization';

const mockUseParamsData = useParamsData as MockedFunction<typeof useParamsData>;

vi.mock('$/routing/useParamsData/useParamsData');

test('healthcare organization shows details about the organization', () => {
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
