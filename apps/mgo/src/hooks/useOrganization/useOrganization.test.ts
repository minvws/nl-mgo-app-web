import { useOrganizationsStore } from '$/store/organizations';
import { faker } from '$test/faker';
import { renderHook } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { useOrganization } from './useOrganization';
import { useParams } from '$/routing';
const mockUseParams = useParams as MockedFunction<typeof useParams>;

vi.mock(
    '$/routing/useParams',
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    () => ({ useParams: vi.fn() }) as typeof import('$/routing/useParams')
);

test('returns the organization based on the slug', () => {
    const { addOrganization } = useOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: organization.slug,
    }));

    const { result } = renderHook(() => useOrganization());
    expect(result.current.organization).toBe(organization);
});

test('returns undefined if the organization was not found', () => {
    const { addOrganization } = useOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: organization.slug + '-not-found',
    }));

    const { result } = renderHook(() => useOrganization());
    expect(result.current.organization).toBe(undefined);
});

test('returns common clinical dataset for the organization', () => {
    const { addOrganization } = useOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());

    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: organization.slug,
    }));

    const { result } = renderHook(() => useOrganization());
    const commonClinicalDataset = result.current.getCommonClinicalDataset();
    expect(commonClinicalDataset).toBeTruthy();
});
