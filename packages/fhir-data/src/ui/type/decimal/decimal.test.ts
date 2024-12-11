import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDecimal } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { decimal } from './decimal';

test('decimal', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const value = faker.fhir.decimal() as MgoDecimal;
    const result = decimal(faker.custom.uiContext())(label, value, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: numberToString(value),
        ...options,
    });
});
