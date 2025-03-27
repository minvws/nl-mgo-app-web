import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers';
import { integer64 } from './integer64';

test('integer64', () => {
    const label = faker.custom.fhirMessageId();

    const value = faker.mgo.integer64();
    const result = integer64(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: numberToString(value?.value),
    });
});
