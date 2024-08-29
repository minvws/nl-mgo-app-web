import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoCode } from '../../../parse/type';
import { toString } from '../../helpers';
import { string } from './string';

test('string', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoCode = faker.fhir.code();
    const result = string(label, value, options);
    expect(result).toEqual({
        label,
        type: 'string',
        display: toString(value),
        ...options,
    });
});
