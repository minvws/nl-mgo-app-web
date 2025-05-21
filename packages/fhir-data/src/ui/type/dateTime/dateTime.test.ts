import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoDateTime } from '../../../parse/type';
import { date as formatDateTime } from '../../format/date/date';
import { dateTime } from './dateTime';

test('dateTime single', () => {
    const label = faker.custom.fhirMessageId();

    const value: MgoDateTime = faker.mgo.dateTime();
    const uiHelperContext = faker.custom.uiHelperContext();
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
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = dateTime(uiHelperContext)(label, value);
    const formatDate = formatDateTime(uiHelperContext);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: value.map((x) => formatDate(x.value)),
    });
});
