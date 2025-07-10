import { faker, testUiSchemaContext } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { createGeneratorContext } from '../createGeneratorContext/createGeneratorContext';
import { processObject } from './processObject';

test('processes root properties to ui elements', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        rootPath,
        faker.fhir.fhirVersion()
    );

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

    const expected = [
        {
            label: testMessage(`${path}.foo`),
            type: 'SINGLE_VALUE',
            display: value.foo.value,
        },
        {
            label: testMessage(`${path}.bak`),
            type: 'SINGLE_VALUE',
            display: value.bak.value,
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('null values are added as single value elements', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
        bak: null,
    };

    const expected = [
        {
            label: testMessage(`${path}.foo`),
            type: 'SINGLE_VALUE',
            display: value.foo.value,
        },
        {
            label: testMessage(`${path}.bak`),
            type: 'SINGLE_VALUE',
            display: undefined,
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('non-root paths get their own group', () => {
    const rootPath = faker.lorem.word();
    const path = `${rootPath}.${faker.lorem.word()}`;
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        rootPath,
        faker.fhir.fhirVersion()
    );

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

    const expected = [
        {
            label: path,
            children: [
                {
                    label: testMessage(`${path}.foo`),
                    type: 'SINGLE_VALUE',
                    display: value.foo.value,
                },
                {
                    label: testMessage(`${path}.bak`),
                    type: 'SINGLE_VALUE',
                    display: value.bak.value,
                },
            ],
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('non-root paths that only have one child DO NOT get their own group', () => {
    const rootPath = faker.lorem.word();
    const path = `${rootPath}.${faker.lorem.word()}`;
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
    };

    const expected = [
        {
            label: testMessage(`${path}.foo`),
            type: 'SINGLE_VALUE',
            display: value.foo.value,
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('deeply nested types are merged to their root parent group', () => {
    const rootPath = faker.lorem.word();
    const path = `${rootPath}.${faker.lorem.word()}`;
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        rootPath,
        faker.fhir.fhirVersion()
    );

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

    const expected = [
        {
            label: path,
            children: [
                {
                    label: testMessage(`${path}.foo`),
                    type: 'SINGLE_VALUE',
                    display: value.foo.value,
                },
                {
                    label: testMessage(`${path}.deep.bak`),
                    type: 'SINGLE_VALUE',
                    display: value.deep.bak.value,
                },
            ],
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});

test('does not try to process meta data properties starting with an underscore', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
        _bak: faker.lorem.word(),
    };

    const expected = [
        {
            label: testMessage(`${path}.foo`),
            type: 'SINGLE_VALUE',
            display: value.foo.value,
        },
    ];

    expect(processObject(context, path, value)).toEqual(expected);
});
