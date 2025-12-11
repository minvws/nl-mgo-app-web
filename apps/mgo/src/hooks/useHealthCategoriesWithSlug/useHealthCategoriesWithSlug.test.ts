import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { useHealthCategoriesWithSlug } from './useHealthCategoriesWithSlug';

vi.mock('$/intl');

test('returns all health categories with unique slugs', () => {
    const { result } = renderHook(() => useHealthCategoriesWithSlug());
    const healthCategories = result.current;
    const healthCategorySlugs = healthCategories.map((category) => category.slug);
    expect(healthCategories.length).toBeGreaterThan(1);
    expect(healthCategorySlugs.length).toBe(healthCategories.length);
    expect(new Set(healthCategorySlugs).size).toBe(healthCategorySlugs.length);
});
