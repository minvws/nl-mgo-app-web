import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import {
    HealthCategoryWithSlug,
    useHealthCategoriesWithSlug,
} from '../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug';
import { useHealthCategoryBySlug } from './useHealthCategoryBySlug';

vi.mock('../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug', async (importActual) => {
    const mod =
        await importActual<
            typeof import('../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug')
        >();
    return { ...mod, useHealthCategoriesWithSlug: vi.fn() };
});

test('return a category based on the matching slug', () => {
    const mockCategories = [
        { slug: 'category-1' },
        { slug: 'category-2' },
        { slug: 'category-3' },
    ] as HealthCategoryWithSlug[];
    vi.mocked(useHealthCategoriesWithSlug).mockReturnValue(mockCategories);
    const { result } = renderHook(() => useHealthCategoryBySlug('category-2'));
    expect(result.current).toBe(mockCategories[1]);
});

test('returns undefined when there is no slug', () => {
    const mockCategories = [
        { slug: 'category-1' },
        { slug: 'category-2' },
        { slug: 'category-3' },
    ] as HealthCategoryWithSlug[];
    vi.mocked(useHealthCategoriesWithSlug).mockReturnValue(mockCategories);
    const { result } = renderHook(() => useHealthCategoryBySlug(undefined));
    expect(result.current).toBe(undefined);
});
