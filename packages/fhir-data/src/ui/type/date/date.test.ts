import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDate } from '../../../parse/type';
import { format } from '../../format';
import * as primitive from './date';

test('date', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const value: MgoDate = faker.fhir.date();
    const result = primitive.date(faker.custom.i18nContext())(label, value, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: format.date(value),
        ...options,
    });
});
