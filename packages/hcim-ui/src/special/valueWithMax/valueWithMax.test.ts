import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { format } from '../../format/index.js';
import { SingleValue } from '../../types/schema.js';
import { valueWithMax } from './valueWithMax.js';

test('valueWithMax', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.number.int();
    const max = faker.number.int();

    const uiValueWithMax = valueWithMax(faker.ui.context());
    const result = uiValueWithMax(label, value, max);
    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: { display: format.valueWithMaxValue(value, max) },
    });
});
