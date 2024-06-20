import { useParams } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store';
import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { HealthcareOrganization } from './HealthcareOrganization';
import { faker } from '$test/faker';

const mockUseParams = useParams as MockedFunction<typeof useParams>;

vi.mock(
    '$/routing/useParams',
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    () => ({ useParams: vi.fn() }) as typeof import('$/routing/useParams')
);

test('healthcare provider shows details about the provider', () => {
    const { addOrganization } = useHealthcareOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    mockUseParams.mockImplementationOnce(() => ({ healthcareOrganizationSlug: organization.slug }));

    setupWithAppProviders(<HealthcareOrganization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(organization.name!);
});

test('healthcare provider shows a message if the provider could not be found', () => {
    mockUseParams.mockImplementationOnce(() => ({
        healthcareOrganizationSlug: faker.word.sample(),
    }));

    setupWithAppProviders(<HealthcareOrganization />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Zorgaanbieder niet gevonden'
    );
});
