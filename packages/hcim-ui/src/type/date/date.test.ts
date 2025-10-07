import { faker } from '$test';
import { type MgoDate } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { date as formatDate } from '../../format/date/date.js';
import { SingleValue } from '../../types/schema.js';
import { date } from './date.js';

test('date', () => {
    const label = faker.custom.fhirMessageId();

    const value: MgoDate = faker.mgo.date();
    const uiHelperContext = faker.ui.context();
    const result = date(uiHelperContext)(label, value);

    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: { display: formatDate(uiHelperContext)(value.value) },
    });
});
