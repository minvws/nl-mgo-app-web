import { faker } from '$test';
import { type MgoPositiveInt, type MgoString, type MgoType } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers/numberToString/numberToString.js';
import { createUiElementHelper } from './createUiElementHelper.js';

test('creates a helper to process single value types', () => {
    const createUiElement = createUiElementHelper(faker.ui.context());

    const label = faker.custom.fhirMessageId();
    const value: MgoString = {
        _type: 'string',
        value: faker.lorem.word(),
    };

    const result = createUiElement<'string'>(label, value);
    const expected = {
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: value.value,
    };

    expect(result).toEqual(expected);
});

test('throws if the ui helper can not be found for this unknown type', () => {
    const createUiElement = createUiElementHelper(faker.ui.context());

    const label = faker.custom.fhirMessageId();
    const value = {
        _type: faker.lorem.word(),
        value: faker.lorem.word(),
    } as unknown as MgoType;

    expect(() => {
        createUiElement(label, value);
    }).toThrow(`No ui helper found for type "${value._type}"`);
});

test(`label is ignored for helpers that don't require one`, () => {
    const createUiElement = createUiElementHelper(faker.ui.context());

    const value = faker.mgo.attachment();
    const label = faker.custom.fhirMessageId();

    const result = createUiElement(label, value);
    const expected = {
        type: 'DOWNLOAD_LINK',
        label: value?.title,
        url: value?.url,
    };

    expect(result).toEqual(expected);
});

test('creates a helper to process multiple same value types', () => {
    const createUiElement = createUiElementHelper(faker.ui.context());

    const label = faker.custom.fhirMessageId();
    const value: MgoString[] = [
        {
            _type: 'string',
            value: faker.lorem.word(),
        },
        {
            _type: 'string',
            value: faker.lorem.word(),
        },
    ];

    const result = createUiElement(label, value);
    const expected = {
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: [value[0].value, value[1].value],
    };

    expect(result).toEqual(expected);
});

test('if a type does not have a dedicated multiple values handle, the single value handler is called multiple times', () => {
    const createUiElement = createUiElementHelper(faker.ui.context());

    const label = faker.custom.fhirMessageId();
    const value: MgoPositiveInt[] = [
        {
            _type: 'positiveInt',
            value: faker.fhir.positiveInt(),
        },
        {
            _type: 'positiveInt',
            value: faker.fhir.positiveInt(),
        },
    ];

    const result = createUiElement(label, value);
    const expected = [
        {
            label: testMessage(label),
            type: 'SINGLE_VALUE',
            display: numberToString(value[0].value),
        },
        {
            label: testMessage(label),
            type: 'SINGLE_VALUE',
            display: numberToString(value[1].value),
        },
    ];

    expect(result).toEqual(expected);
});
