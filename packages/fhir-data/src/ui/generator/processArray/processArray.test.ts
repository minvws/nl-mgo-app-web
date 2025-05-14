import { faker, testUiSchemaContext } from '$test';
import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoString } from '../../../parse/type';
import { boolean } from '../../type/boolean/boolean';
import { string } from '../../type/string/string';
import { createGeneratorContext } from '../createGeneratorContext/createGeneratorContext';
import { processObject } from '../processObject/processObject';
import { processArray } from './processArray';

test('values of the same type get processed together', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const context = createGeneratorContext(
        healthUiSchemaContext,
        rootPath,
        faker.fhir.fhirVersion()
    );

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

    const expected = [string(healthUiSchemaContext)(path as FhirMessagesIds, value)];

    expect(processArray(context, path, value)).toEqual(expected);
});

test('values of different types are processed seperately', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const context = createGeneratorContext(
        healthUiSchemaContext,
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value = [
        {
            _type: 'string',
            value: faker.lorem.word(),
        },
        {
            _type: 'boolean',
            value: faker.datatype.boolean(),
        },
        {
            _type: 'string',
            value: faker.lorem.word(),
        },
    ] as const;

    const expected = [
        string(healthUiSchemaContext)(path as FhirMessagesIds, value[0]),
        boolean(healthUiSchemaContext)(path as FhirMessagesIds, value[1]),
        string(healthUiSchemaContext)(path as FhirMessagesIds, value[2]),
    ];

    expect(processArray(context, path, value as any)).toEqual(expected); // eslint-disable-line @typescript-eslint/no-explicit-any
});

test('non-mgo types are processed as usual', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const context = createGeneratorContext(
        healthUiSchemaContext,
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value = [
        {
            _type: 'string',
            value: faker.lorem.word(),
        },
        {
            foo: {
                bar: {
                    _type: 'string',
                    value: faker.lorem.word(),
                },
            },
        },
    ] as const;

    const expected = [
        string(healthUiSchemaContext)(path as FhirMessagesIds, value[0]),
        ...processObject(context, path, value[1]),
    ];

    expect(processArray(context, path, value as any)).toEqual(expected); // eslint-disable-line @typescript-eslint/no-explicit-any
});

test('empty array returns empty result', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const context = createGeneratorContext(
        healthUiSchemaContext,
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value: unknown[] = [];
    const expected = [
        {
            label: testMessage(path),
            type: 'SINGLE_VALUE',
            display: undefined,
        },
    ];

    expect(processArray(context, path, value)).toEqual(expected);
});
