import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { annotation } from './annotation.js';

test('annotation', () => {
    const label = faker.custom.fhirMessageId();
    const data = faker.mgo.annotation();
    const result = annotation(faker.ui.context())(label, data);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: data.text,
    });
});
