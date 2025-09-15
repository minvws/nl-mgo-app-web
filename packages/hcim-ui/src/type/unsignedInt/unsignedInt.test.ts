import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers/index.js';
import { unsignedInt } from './unsignedInt.js';

test('unsignedInt', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.unsignedInt();
    const result = unsignedInt(faker.ui.context())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: numberToString(value?.value),
    });
});
