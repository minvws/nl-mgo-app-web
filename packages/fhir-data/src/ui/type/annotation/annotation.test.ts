import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { annotation } from './annotation';

test('annotation', () => {
    const label = faker.custom.fhirMessageId();

    const data = faker.mgo.annotation();

    const result = annotation(faker.custom.uiHelperContext())(label, data);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: data.text,
    });
});
