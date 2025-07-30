import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { format } from '../../format/index.js';
import { valueWithUnit } from './valueWithUnit.js';

test('valueWithUnit', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.number.int();
    const unit = faker.lorem.word();

    const uiValueWithUnit = valueWithUnit(faker.ui.context());
    const result = uiValueWithUnit(label, value, unit);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: format.valueWithUnit(value, unit),
    });
});
