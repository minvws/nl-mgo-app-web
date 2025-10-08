import { renderHook } from '@testing-library/react';
import { afterEach, expect, type MockedFunction, test, vi } from 'vitest';

import { useParams } from '$/routing';
import { type Resource } from '$/store';
import { faker } from '$test/faker';
import { useResourceDetailsRoutePath } from './useResourceRouteDetailsPath';

afterEach(() => {
    vi.restoreAllMocks();
});

vi.mock('$/routing/useParams');
const mockUseParams = useParams as MockedFunction<typeof useParams>;

test('returns organisations path if slug is present', () => {
    const resourceSlug = faker.lorem.slug();
    const organizationSlug = faker.lorem.slug();
    const healthCategorySlug = faker.lorem.slug();

    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug,
        healthCategorySlug,
        resourceSlug: faker.lorem.slug(),
    }));

    const { result } = renderHook(() =>
        useResourceDetailsRoutePath({
            slug: resourceSlug,
        } as Resource)
    );

    expect(result.current).toBe(
        `/zorgaanbieders/${organizationSlug}/${healthCategorySlug}/${resourceSlug}/detail`
    );
});

test('returns overview path if slug is present', () => {
    const resourceSlug = faker.lorem.slug();
    const healthCategorySlug = faker.lorem.slug();

    mockUseParams.mockImplementationOnce(() => ({
        healthCategorySlug,
        resourceSlug: faker.lorem.slug(),
    }));

    const { result } = renderHook(() =>
        useResourceDetailsRoutePath({
            slug: resourceSlug,
        } as Resource)
    );

    expect(result.current).toBe(`/overzicht/${healthCategorySlug}/${resourceSlug}/detail`);
});

test('if there is no resource the slug will default to undefined', () => {
    const healthCategorySlug = faker.lorem.slug();

    mockUseParams.mockImplementationOnce(() => ({
        healthCategorySlug,
        resourceSlug: faker.lorem.slug(),
    }));

    const { result } = renderHook(() => useResourceDetailsRoutePath(undefined));

    expect(result.current).toBe(`/overzicht/${healthCategorySlug}/undefined/detail`);
});
