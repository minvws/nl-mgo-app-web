import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoDate } from '../../../parse/type';
import { date as formatDate } from '../../format/date/date';
import { date } from './date';

test('date', () => {
    const label = faker.custom.fhirMessageId();

    const value: MgoDate = faker.mgo.date();
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = date(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: formatDate(uiHelperContext)(value.value),
    });
});
