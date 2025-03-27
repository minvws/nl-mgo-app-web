import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { date as formatDateTime } from '../../format/date/date';
import { instant } from './instant';

test('instant single', () => {
    const label = faker.custom.fhirMessageId();

    const value = faker.mgo.instant();
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = instant(uiHelperContext)(label, value);
    const formatDate = formatDateTime(uiHelperContext);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: formatDate(value?.value),
    });
});

test('instant multiple', () => {
    const label = faker.custom.fhirMessageId();

    const value = [faker.mgo.instant(), faker.mgo.instant(), faker.mgo.instant()];
    const uiHelperContext = faker.custom.uiHelperContext();
    const result = instant(uiHelperContext)(label, value);
    const formatDate = formatDateTime(uiHelperContext);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: value.map((x) => formatDate(x?.value)),
    });
});
