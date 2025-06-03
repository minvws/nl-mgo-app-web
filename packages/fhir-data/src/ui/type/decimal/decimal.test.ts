import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers';
import { decimal } from './decimal';

test('decimal', () => {
    const label = faker.custom.fhirMessageId();

    const value = faker.mgo.decimal();
    const result = decimal(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: numberToString(value?.value),
    });
});
