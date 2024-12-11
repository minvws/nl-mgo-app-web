import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoUnsignedInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { unsignedInt } from './unsignedInt';

test('unsignedInt', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const value = faker.fhir.unsignedInt() as MgoUnsignedInt;
    const result = unsignedInt(faker.custom.uiContext())(label, value, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: numberToString(value),
        ...options,
    });
});
