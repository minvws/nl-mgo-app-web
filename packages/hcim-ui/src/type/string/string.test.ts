import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { toString } from '../../helpers/index.js';
import { string } from './string.js';

test('string', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.string();
    const result = string(faker.ui.context())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: toString(value?.value),
    });
});
