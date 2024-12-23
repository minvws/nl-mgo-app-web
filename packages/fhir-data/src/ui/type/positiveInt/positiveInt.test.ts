import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoPositiveInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { positiveInt } from './positiveInt';

test('positiveInt', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const value = faker.fhir.unsignedInt() as MgoPositiveInt;
    const result = positiveInt(faker.custom.i18nContext())(label, value, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: numberToString(value),
        ...options,
    });
});
