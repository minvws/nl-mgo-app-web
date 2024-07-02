import { useParams } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { Organization } from './Organization';

const mockUseParams = useParams as MockedFunction<typeof useParams>;

vi.mock(
    '$/routing/useParams',
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    () => ({ useParams: vi.fn() }) as typeof import('$/routing/useParams')
);

test('healthcare provider shows details about the provider', () => {
    const { addOrganization } = useOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    mockUseParams.mockImplementationOnce(() => ({ organizationSlug: organization.slug }));

    setupWithAppProviders(<Organization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        message('organization.heading', { organizationName: organization.name })
    );
});

test('healthcare provider shows a message if the provider could not be found', async () => {
    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: faker.word.sample(),
    }));

    setupWithAppProviders(<Organization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        message('organization.not_found_heading')
    );
});
