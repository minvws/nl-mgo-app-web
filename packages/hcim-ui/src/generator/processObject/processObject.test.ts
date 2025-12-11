import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { HealthUiGroup, UiElement } from '../../types/schema.js';
import { createGeneratorContext } from '../createGeneratorContext/createGeneratorContext.js';
import { processObject } from './processObject.js';

test('processes root properties to ui elements', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const context = createGeneratorContext(faker.ui.context(), rootPath, faker.fhir.fhirVersion());

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
        bak: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
    };

    const expected: UiElement[] = [
        {
            label: testMessage(`${path}.foo`),
            type: 'SINGLE_VALUE',
            value: { display: value.foo.value },
        },
        {
            label: testMessage(`${path}.bak`),
            type: 'SINGLE_VALUE',
            value: { display: value.bak.value },
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('null values are added as single value elements', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const context = createGeneratorContext(faker.ui.context(), rootPath, faker.fhir.fhirVersion());

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
        bak: null,
    };

    const expected: UiElement[] = [
        {
            label: testMessage(`${path}.foo`),
            type: 'SINGLE_VALUE',
            value: { display: value.foo.value },
        },
        {
            label: testMessage(`${path}.bak`),
            type: 'SINGLE_VALUE',
            value: undefined,
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('non-root paths get their own group', () => {
    const rootPath = faker.lorem.word();
    const path = `${rootPath}.${faker.lorem.word()}`;
    const context = createGeneratorContext(faker.ui.context(), rootPath, faker.fhir.fhirVersion());

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
        bak: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
    };

    const expected: HealthUiGroup[] = [
        {
            label: path,
            children: [
                {
                    label: testMessage(`${path}.foo`),
                    type: 'SINGLE_VALUE',
                    value: { display: value.foo.value },
                },
                {
                    label: testMessage(`${path}.bak`),
                    type: 'SINGLE_VALUE',
                    value: { display: value.bak.value },
                },
            ],
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('non-root paths that only have one child DO NOT get their own group', () => {
    const rootPath = faker.lorem.word();
    const path = `${rootPath}.${faker.lorem.word()}`;
    const context = createGeneratorContext(faker.ui.context(), rootPath, faker.fhir.fhirVersion());

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
    };

    const expected: UiElement[] = [
        {
            label: testMessage(`${path}.foo`),
            type: 'SINGLE_VALUE',
            value: { display: value.foo.value },
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('deeply nested types are merged to their root parent group', () => {
    const rootPath = faker.lorem.word();
    const path = `${rootPath}.${faker.lorem.word()}`;
    const context = createGeneratorContext(faker.ui.context(), rootPath, faker.fhir.fhirVersion());

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
        deep: {
            bak: {
                _type: 'string',
                value: faker.lorem.sentence(),
            },
        },
    };

    const expected: HealthUiGroup[] = [
        {
            label: path,
            children: [
                {
                    label: testMessage(`${path}.foo`),
                    type: 'SINGLE_VALUE',
                    value: { display: value.foo.value },
                },
                {
                    label: testMessage(`${path}.deep.bak`),
                    type: 'SINGLE_VALUE',
                    value: { display: value.deep.bak.value },
                },
            ],
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('does not try to process meta data properties starting with an underscore', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const context = createGeneratorContext(faker.ui.context(), rootPath, faker.fhir.fhirVersion());

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
        _bak: faker.lorem.word(),
    };

    const expected: UiElement[] = [
        {
            label: testMessage(`${path}.foo`),
            type: 'SINGLE_VALUE',
            value: { display: value.foo.value },
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});
