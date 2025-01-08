import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoInstant } from '../../../parse/type';
import { date as formatDateTime } from '../../format/date/date';
import { instant } from './instant';

test('instant single', () => {
    const label = faker.custom.messageId();

    const value: MgoInstant = faker.fhir.instant();
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = instant(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: formatDateTime(uiHelperContext)(value),
    });
});

test('instant multiple', () => {
    const label = faker.custom.messageId();

    const value: MgoInstant[] = [faker.fhir.instant(), faker.fhir.instant(), faker.fhir.instant()];
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = instant(uiHelperContext)(label, value);

    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'MULTIPLE_VALUES',
        display: value.map(formatDateTime(uiHelperContext)),
    });
});
