import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoReference } from '../../../parse/type';
import * as special from './special';

test('reference', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoReference = {
        display: faker.lorem.word(),
        reference: faker.lorem.word(),
    };
    const result = special.reference(label, value, options);
    expect(result).toEqual({
        label,
        type: 'reference',
        display: value.display,
        reference: value.reference,
        ...options,
    });
});
