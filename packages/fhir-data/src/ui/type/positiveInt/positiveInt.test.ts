import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoPositiveInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { positiveInt } from './positiveInt';

test('positiveInt', () => {
    const label = faker.custom.fhirMessageId();

    const value = faker.fhir.unsignedInt() as MgoPositiveInt;
    const result = positiveInt(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: numberToString(value),
    });
});
