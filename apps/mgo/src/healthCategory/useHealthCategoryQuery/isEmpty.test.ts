import { expect, test } from 'vitest';
import { type HealthCategoryData } from '../useHealthCategoryData/useHealthCategoryData';
import { isEmpty } from './isEmpty';
import { faker } from '$test/faker';

test.each<[HealthCategoryData | undefined, boolean]>([
    [undefined, true],
    [{}, true],
    [{ foo: [] }, true],
    [{ foo: faker.lorem.word() }, true],
    [{ foo: [faker.lorem.word()] }, false],
    [{ foo: [undefined] }, false],
])('returns whether the data contains filled arrays: %s', (data, expectedResult) => {
    const result = isEmpty(data);
    expect(result).toBe(expectedResult);
});
