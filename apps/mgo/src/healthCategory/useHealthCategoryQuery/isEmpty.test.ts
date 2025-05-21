import { expect, test } from 'vitest';
import { type HealthCategoryData } from '../useHealthCategoryData/useHealthCategoryData';
import { isEmpty } from './isEmpty';
import { faker } from '$test/faker';

test.each<[HealthCategoryData | undefined, boolean]>([
    [undefined, true],
    [{} as HealthCategoryData, true],
    [{ foo: [] } as unknown as HealthCategoryData, true],
    [{ foo: faker.lorem.word() } as unknown as HealthCategoryData, true],
])('returns whether the data contains filled arrays: %s', (data, expectedResult) => {
    const result = isEmpty(data);
    expect(result).toBe(expectedResult);
});
