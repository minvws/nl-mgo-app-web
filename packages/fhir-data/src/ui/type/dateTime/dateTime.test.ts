import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDateTime } from '../../../parse/type';
import { date as formatDateTime } from '../../format/date/date';
import { dateTime } from './dateTime';

test('dateTime single', () => {
    const label = faker.custom.messageId();

    const value: MgoDateTime = faker.fhir.dateTime();
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = dateTime(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: formatDateTime(uiHelperContext)(value),
    });
});

test('dateTime multiple', () => {
    const label = faker.custom.messageId();

    const value: MgoDateTime[] = [
        faker.fhir.dateTime(),
        faker.fhir.dateTime(),
        faker.fhir.dateTime(),
    ];
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = dateTime(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'MULTIPLE_VALUES',
        display: value.map(formatDateTime(uiHelperContext)),
    });
});
