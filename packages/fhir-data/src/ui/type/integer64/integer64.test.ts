import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoInteger64 } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { integer64 } from './integer64';

test('integer64', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const value = faker.fhir.integer64() as MgoInteger64;
    const result = integer64(faker.custom.uiContext())(label, value, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: numberToString(value),
        ...options,
    });
});
