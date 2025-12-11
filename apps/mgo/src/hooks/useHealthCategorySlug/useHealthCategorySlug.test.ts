import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { HealthCategoryConfig } from '$/config';
import {
    HealthCategoryWithSlug,
    useHealthCategoriesWithSlug,
} from '../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug';
import { useHealthCategorySlug } from './useHealthCategorySlug';

vi.mock('../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug', async (importActual) => {
    const mod =
        await importActual<
            typeof import('../useHealthCategoriesWithSlug/useHealthCategoriesWithSlug')
        >();
    return { ...mod, useHealthCategoriesWithSlug: vi.fn() };
});

test('returns all health categories with unique slugs', () => {
    const mockCategories = [
        { id: '1', slug: 'category-1' },
        { id: '2', slug: 'category-2' },
        { id: '3', slug: 'category-3' },
    ] as HealthCategoryWithSlug[];
    vi.mocked(useHealthCategoriesWithSlug).mockReturnValue(mockCategories);

    const { result } = renderHook(() => useHealthCategorySlug({ id: '2' } as HealthCategoryConfig));
    expect(result.current).toBe('category-2');
});
