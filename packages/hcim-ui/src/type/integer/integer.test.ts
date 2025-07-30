import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers/index.js';
import { integer } from './integer.js';

test('integer', () => {
    const label = faker.custom.fhirMessageId();

    const value = faker.mgo.integer();
    const result = integer(faker.ui.context())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: numberToString(value?.value),
    });
});
