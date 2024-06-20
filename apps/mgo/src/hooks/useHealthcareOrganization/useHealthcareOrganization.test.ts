import { useHealthcareOrganizationsStore } from '$/store/healthcareOrganizations';
import { faker } from '$test/faker';
import { renderHook } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { useHealthcareOrganization } from './useHealthcareOrganization';
import { useParams } from '$/routing';
const mockUseParams = useParams as MockedFunction<typeof useParams>;

vi.mock(
    '$/routing/useParams',
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    () => ({ useParams: vi.fn() }) as typeof import('$/routing/useParams')
);

test('returns the organization based on the slug', () => {
    const { addOrganization } = useHealthcareOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    mockUseParams.mockImplementationOnce(() => ({
        healthcareOrganizationSlug: organization.slug,
    }));

    const { result } = renderHook(() => useHealthcareOrganization());
    expect(result.current.organization).toBe(organization);
});

test('returns undefined if the organization was not found', () => {
    const { addOrganization } = useHealthcareOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    mockUseParams.mockImplementationOnce(() => ({
        healthcareOrganizationSlug: organization.slug + '-not-found',
    }));

    const { result } = renderHook(() => useHealthcareOrganization());
    expect(result.current.organization).toBe(undefined);
});

test('returns common clinical dataset for the organization', () => {
    const { addOrganization } = useHealthcareOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    mockUseParams.mockImplementationOnce(() => ({
        healthcareOrganizationSlug: organization.slug,
    }));

    const { result } = renderHook(() => useHealthcareOrganization());
    const commonClinicalDataset = result.current.getCommonClinicalDataset();
    expect(commonClinicalDataset).toBeTruthy();
});
