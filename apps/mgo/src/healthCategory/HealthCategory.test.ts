import { expect, test } from 'vitest';
import { HealthCategory, getHealthCategoryBySlug } from './HealthCategory';

test('getHealthCategoryBySlug returns category', async () => {
    const result = getHealthCategoryBySlug('medicijnen');
    expect(result).toEqual(HealthCategory.Medication);
});
test('getHealthCategoryBySlug throws if slug is invalid', async () => {
    expect(() => {
        getHealthCategoryBySlug('foobar');
    }).toThrowError(
        'No health category found for slug: "foobar", this is most likely not a valid slug value.'
    );
});
