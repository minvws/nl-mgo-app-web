import { healthCategorySlugs } from '$/healthCategory';
import { useParams } from '$/routing';
import { useOrganizationsStore, useResourcesStore } from '$/store';
import { faker } from '$test/faker';
import { renderHook } from '@testing-library/react';
import { beforeEach, expect, type MockedFunction, test, vi } from 'vitest';
import { useParamsData } from './useParamsData';

vi.mock('$/routing/useParams');

const mockUseParams = useParams as MockedFunction<typeof useParams>;
mockUseParams.mockImplementation(() => ({
    organizationSlug: undefined,
    healthCategorySlug: undefined,
    resourceSlug: undefined,
}));

beforeEach(() => {
    mockUseParams.mockReset();
});

test('returns undefined if there are no params', async () => {
    const store = useOrganizationsStore.getState();
    const mock = vi.spyOn(store, 'getOrganizationBySlug');
    mock.mockImplementation(() => undefined);

    const { result } = renderHook(() => useParamsData());

    expect(result.current).toEqual({
        ...mockUseParams(),
        organization: undefined,
        healthCategory: undefined,
        resource: undefined,
    });
});

test('returns organization based on slug', async () => {
    const mockGetOrganizationBySlug = vi.spyOn(
        useOrganizationsStore.getState(),
        'getOrganizationBySlug'
    );
    const organization = faker.custom.healthcareOrganization();
    const organizationSlug = faker.lorem.slug();

    mockUseParams.mockReturnValue({ organizationSlug });
    mockGetOrganizationBySlug.mockReturnValueOnce(organization);

    const { result } = renderHook(() => useParamsData());

    expect(result.current).toEqual({
        ...mockUseParams(),
        organization,
        healthCategory: undefined,
        resource: undefined,
    });

    expect(mockGetOrganizationBySlug).toHaveBeenCalledWith(organizationSlug);
});

test('returns resource based on slug', async () => {
    const mockGetResourceBySlug = vi.spyOn(useResourcesStore.getState(), 'getResourceBySlug');
    const resource = faker.custom.resource();
    const resourceSlug = faker.lorem.slug();

    mockUseParams.mockReturnValue({ resourceSlug });
    mockGetResourceBySlug.mockReturnValueOnce(resource);

    const { result } = renderHook(() => useParamsData());

    expect(result.current).toEqual({
        ...mockUseParams(),
        organization: undefined,
        healthCategory: undefined,
        resource,
    });

    expect(mockGetResourceBySlug).toHaveBeenCalledWith(resourceSlug);
});

test('returns health category based on slug', async () => {
    const healthCategory = faker.helpers.arrayElement(Object.keys(healthCategorySlugs));
    const healthCategorySlug =
        healthCategorySlugs[healthCategory as keyof typeof healthCategorySlugs];

    mockUseParams.mockReturnValue({ healthCategorySlug });
    const { result } = renderHook(() => useParamsData());

    expect(result.current).toEqual({
        ...mockUseParams(),
        organization: undefined,
        healthCategory,
        resource: undefined,
    });
});
