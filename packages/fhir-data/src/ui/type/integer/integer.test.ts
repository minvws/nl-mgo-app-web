import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoInteger } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { integer } from './integer';

test('integer', () => {
    const label = faker.custom.messageId();

    const value = faker.fhir.integer() as MgoInteger;
    const result = integer(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: numberToString(value),
    });
});
