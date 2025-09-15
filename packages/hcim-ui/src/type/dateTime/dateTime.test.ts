import { faker } from '$test';
import { type MgoDateTime } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { date as formatDateTime } from '../../format/date/date.js';
import { dateTime } from './dateTime.js';

test('dateTime single', () => {
    const label = faker.custom.fhirMessageId();

    const value: MgoDateTime = faker.mgo.dateTime();
    const uiHelperContext = faker.ui.context();
    const result = dateTime(uiHelperContext)(label, value);
    const formatDate = formatDateTime(uiHelperContext);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: formatDate(value.value),
    });
});

test('dateTime multiple', () => {
    const label = faker.custom.fhirMessageId();

    const value: MgoDateTime[] = [faker.mgo.dateTime(), faker.mgo.dateTime(), faker.mgo.dateTime()];
    const uiHelperContext = faker.ui.context();
    const result = dateTime(uiHelperContext)(label, value);
    const formatDate = formatDateTime(uiHelperContext);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: value.map((x) => formatDate(x.value)),
    });
});
