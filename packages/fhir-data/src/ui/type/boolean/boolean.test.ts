import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { boolean } from './boolean';

test('boolean - true', () => {
    const label = faker.custom.fhirMessageId();

    const context = faker.custom.uiHelperContext();
    const result = boolean(context)(label, {
        _type: 'boolean',
        value: true,
    });
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: testMessage('fhir.boolean.true'),
    });
});

test('boolean - false', () => {
    const label = faker.custom.fhirMessageId();

    const context = faker.custom.uiHelperContext();
    const result = boolean(context)(label, {
        _type: 'boolean',
        value: false,
    });
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: testMessage('fhir.boolean.false'),
    });
});

test('boolean - undefined', () => {
    const label = faker.custom.fhirMessageId();

    const context = faker.custom.uiHelperContext();
    const result = boolean(context)(label, undefined);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: undefined,
    });
});
