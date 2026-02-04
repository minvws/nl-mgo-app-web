import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { MultipleValues, ReferenceValue, SingleValue } from '../../types/schema.js';
import * as special from './reference.js';

test('reference', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.reference();
    const result = special.reference(faker.ui.context())(label, value);

    expect(result).toMatchObject<Partial<ReferenceValue>>({
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
        faker.ui.context({
            isSummary: true,
        })
    )(label, value);

    expect(result).toMatchObject<Partial<SingleValue>>({
        type: 'SINGLE_VALUE',
        value: { display: value.display },
    });
});

test('reference renders MULTIPLE_VALUES for multiple references', () => {
    const label = faker.custom.fhirMessageId();
    const value = [faker.mgo.reference(), faker.mgo.reference()];
    const result = special.reference(faker.ui.context())(label, value);

    expect(result).toMatchObject<Partial<MultipleValues>>({
        type: 'MULTIPLE_VALUES',
        value: [{ display: value[0].display }, { display: value[1].display }],
    });
});
