import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoInstant } from '../../../parse/type';
import { format } from '../../format';
import { instant } from './instant';

test('date', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const value: MgoInstant = faker.fhir.instant();
    const result = instant(faker.custom.uiContext())(label, value, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: format.dateTime(value),
        ...options,
    });
});
