import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import * as special from './reference';

test('reference', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.reference();
    const result = special.reference(faker.custom.uiHelperContext())(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'REFERENCE_VALUE',
        display: value.display,
        reference: value.reference,
    });
});

test('reference renders single value for summaries', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.reference();
    const result = special.reference(
        faker.custom.uiHelperContext({
            isSummary: true,
        })
    )(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: value.display,
    });
});

test('reference renders MULTIPLE_VALUES for multiple references', () => {
    const label = faker.custom.fhirMessageId();
    const value = [faker.mgo.reference(), faker.mgo.reference()];
    const result = special.reference(faker.custom.uiHelperContext())(label, value);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: [value[0].display, value[1].display],
    });
});
