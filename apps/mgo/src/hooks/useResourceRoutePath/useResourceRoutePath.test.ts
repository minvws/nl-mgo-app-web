import { renderHook } from '@testing-library/react';
import { afterEach, expect, type MockedFunction, test, vi } from 'vitest';

import { useParams } from '$/routing';
import { type Resource } from '$/store';
import { faker } from '$test/faker';
import { useResourceRoutePath } from './useResourceRoutePath';

afterEach(() => {
    vi.restoreAllMocks();
});

vi.mock('$/routing/useParams');
const mockUseParams = useParams as MockedFunction<typeof useParams>;

test('returns organisations path if slug is present', () => {
    const resourceSlug = faker.lorem.slug();
    const organizationSlug = faker.lorem.slug();
    const healthCategorySlug = faker.custom.healthCategorySlug();

    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug,
        healthCategorySlug,
        resourceSlug: faker.lorem.slug(),
    }));

    const { result } = renderHook(() =>
        useResourceRoutePath({
            slug: resourceSlug,
        } as Resource)
    );

    expect(result.current).toBe(
        `/organisaties/${organizationSlug}/${healthCategorySlug}/${resourceSlug}/detail`
    );
});

test('returns overview path if slug is present', () => {
    const resourceSlug = faker.lorem.slug();
    const healthCategorySlug = faker.custom.healthCategorySlug();

    mockUseParams.mockImplementationOnce(() => ({
        healthCategorySlug,
        resourceSlug: faker.lorem.slug(),
    }));

    const { result } = renderHook(() =>
        useResourceRoutePath({
            slug: resourceSlug,
        } as Resource)
    );

    expect(result.current).toBe(`/overzicht/${healthCategorySlug}/${resourceSlug}/detail`);
});

test('if there is no resource the slug will default to undefined', () => {
    const healthCategorySlug = faker.custom.healthCategorySlug();

    mockUseParams.mockImplementationOnce(() => ({
        healthCategorySlug,
        resourceSlug: faker.lorem.slug(),
    }));

    const { result } = renderHook(() => useResourceRoutePath(undefined));

    expect(result.current).toBe(`/overzicht/${healthCategorySlug}/undefined/detail`);
});
