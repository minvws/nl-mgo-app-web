import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers/index.js';
import { SingleValue } from '../../types/schema.js';
import { positiveInt } from './positiveInt.js';

test('positiveInt', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.positiveInt();
    const result = positiveInt(faker.ui.context())(label, value);
    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: { display: numberToString(value?.value) },
    });
});
