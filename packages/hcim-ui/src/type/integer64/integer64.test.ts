import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers/index.js';
import { SingleValue } from '../../types/schema.js';
import { integer64 } from './integer64.js';

test('integer64', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.integer64();
    const result = integer64(faker.ui.context())(label, value);
    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: { display: numberToString(value?.value) },
    });
});
