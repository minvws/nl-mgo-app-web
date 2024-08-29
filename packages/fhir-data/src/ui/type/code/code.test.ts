import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoCode } from '../../../parse/type';
import { toString } from '../../helpers';
import { code } from './code';

test('code', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoCode = faker.fhir.code();
    const result = code(label, value, options);
    expect(result).toEqual({
        label,
        type: 'code',
        display: toString(value),
        ...options,
    });
});
