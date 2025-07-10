import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { toString } from '../../helpers';
import { string } from './string';

test('string', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.string();
    const result = string(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: toString(value?.value),
    });
});
