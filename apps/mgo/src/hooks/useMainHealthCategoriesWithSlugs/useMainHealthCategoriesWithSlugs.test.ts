import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { useMainHealthCategoriesWithSlugs } from './useMainHealthCategoriesWithSlugs';
import * as useHealthCategoriesWithSlugModule from '../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug';

vi.mock('$/intl');

test('returns all main health categories with unique slugs', () => {
    const { result } = renderHook(() => useMainHealthCategoriesWithSlugs());
    const mainHealthCategories = result.current;
    const mainHealthCategoriesSlugs = mainHealthCategories.map((category) =>
        category.categories.flatMap((category) => category.slug)
    );
    expect(mainHealthCategories.length).toBeGreaterThan(1);
    expect(mainHealthCategoriesSlugs.length).toBe(mainHealthCategories.length);

    expect(new Set(mainHealthCategoriesSlugs).size).toBe(mainHealthCategoriesSlugs.length);
});

test('throws error when health category with slug not found', () => {
    vi.spyOn(useHealthCategoriesWithSlugModule, 'useHealthCategoriesWithSlug').mockReturnValue([]);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
        renderHook(() => useMainHealthCategoriesWithSlugs());
    }).toThrow(/Health category with slug not found for category/);

    consoleSpy.mockRestore();
    vi.restoreAllMocks();
});
