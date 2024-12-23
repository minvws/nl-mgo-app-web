import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDateTime } from '../../../parse/type';
import { format } from '../../format';
import * as primitive from './dateTime';

test('dateTime', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const value: MgoDateTime = faker.fhir.dateTime();
    const result = primitive.dateTime(faker.custom.i18nContext())(label, value, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: format.dateTime(value),
        ...options,
    });
});
