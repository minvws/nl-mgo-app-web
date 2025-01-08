import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDate } from '../../../parse/type';
import { date as formatDate } from '../../format/date/date';
import { date } from './date';

test('date', () => {
    const label = faker.custom.messageId();

    const value: MgoDate = faker.fhir.date();
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = date(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: formatDate(uiHelperContext)(value),
    });
});
