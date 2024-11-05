import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDuration } from '../../../parse/type';
import { format } from '../../format';
import { duration } from './duration';

function mockQuantity() {
    return {
        value: faker.number.float(),
        comparator: faker.fhir.code(['<', '<=', '>=', '>']),
        code: faker.fhir.code(),
        system: faker.internet.url(),
        unit: faker.lorem.word(),
    };
}

test('duration', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoDuration: MgoDuration = mockQuantity();
    const result = duration(label, mgoDuration, options);
    expect(result).toEqual([
        {
            label: `${label}.value`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(mgoDuration.value, mgoDuration.unit),
            ...options,
        },
        {
            label: `${label}.code`,
            type: `SINGLE_VALUE`,
            display: format.codeWithSystem(mgoDuration.code, mgoDuration.system),
            ...options,
        },
    ]);
});
