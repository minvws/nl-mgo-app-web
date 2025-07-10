import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers';
import { integer } from './integer';

test('integer', () => {
    const label = faker.custom.fhirMessageId();

    const value = faker.mgo.integer();
    const result = integer(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: numberToString(value?.value),
    });
});
