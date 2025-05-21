import { expect, test } from 'vitest';
import { HealthCategory, getHealthCategoryBySlug } from './HealthCategory';

test('getHealthCategoryBySlug returns category', async () => {
    const result = getHealthCategoryBySlug('medicijnen');
    expect(result).toEqual(HealthCategory.Medication);
});
test('getHealthCategoryBySlug return undefined if slug is invalid', async () => {
    const result = getHealthCategoryBySlug('foobar');
    expect(result).toBeUndefined();
});
