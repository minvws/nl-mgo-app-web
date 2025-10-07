import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { SingleValue } from '../../types/schema.js';
import { boolean } from './boolean.js';

test('boolean - true', () => {
    const label = faker.custom.fhirMessageId();

    const context = faker.ui.context();
    const result = boolean(context)(label, {
        _type: 'boolean',
        value: true,
    });
    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: { display: testMessage('fhir.boolean.true') },
    });
});

test('boolean - false', () => {
    const label = faker.custom.fhirMessageId();

    const context = faker.ui.context();
    const result = boolean(context)(label, {
        _type: 'boolean',
        value: false,
    });
    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: { display: testMessage('fhir.boolean.false') },
    });
});

test('boolean - undefined', () => {
    const label = faker.custom.fhirMessageId();

    const context = faker.ui.context();
    const result = boolean(context)(label, undefined);
    expect(result).toEqual<SingleValue>({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        value: undefined,
    });
});
