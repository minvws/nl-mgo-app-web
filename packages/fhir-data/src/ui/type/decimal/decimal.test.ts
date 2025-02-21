import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoDecimal } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { decimal } from './decimal';

test('decimal', () => {
    const label = faker.custom.fhirMessageId();

    const value = faker.fhir.decimal() as MgoDecimal;
    const result = decimal(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: numberToString(value),
    });
});
