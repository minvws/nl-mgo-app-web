import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoCode } from '../../../parse/type';
import { toString } from '../../helpers';
import { string } from './string';

test('string', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const value: MgoCode = faker.fhir.code();
    const result = string(faker.custom.uiContext())(label, value, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: toString(value),
        ...options,
    });
});
