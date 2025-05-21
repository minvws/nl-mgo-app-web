import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers';
import { unsignedInt } from './unsignedInt';

test('unsignedInt', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.unsignedInt();
    const result = unsignedInt(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: numberToString(value?.value),
    });
});
