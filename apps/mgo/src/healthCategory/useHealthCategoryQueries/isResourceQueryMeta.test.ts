import { faker } from '$test/faker';
import { expect, test } from 'vitest';
import { isResourceQueryMeta } from './isResourceQueryMeta';

test.each<[boolean, unknown]>([
    [false, undefined],
    [false, {}],
    [false, { foo: [] }],
    [false, { foo: faker.lorem.word() }],
    [false, { foo: [faker.lorem.word()] }],
    [false, { foo: [undefined] }],
    [false, { method: faker.lorem.word() }],
    [false, { method: faker.lorem.word(), organizationId: faker.lorem.word() }],
    [
        false,
        {
            method: faker.lorem.word(),
            organizationId: faker.lorem.word(),
            dataServiceId: faker.lorem.word(),
        },
    ],
    [
        true,
        {
            method: faker.lorem.word(),
            organizationId: faker.lorem.word(),
            dataServiceId: faker.lorem.word(),
            fhirVersion: 'R3',
        },
    ],
])('isResourceQueryMeta returns %s for %j', (expectedResult, data) => {
    const result = isResourceQueryMeta(data);
    expect(result).toBe(expectedResult);
});
