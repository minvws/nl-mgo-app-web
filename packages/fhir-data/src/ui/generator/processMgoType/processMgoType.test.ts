import { faker, testUiSchemaContext } from '$test';
import { type FhirMessagesIds } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoBoolean, type MgoString } from '../../../parse/type';
import { type ExtensionValue } from '../../../parse/types';
import { boolean } from '../../type/boolean/boolean';
import { string } from '../../type/string/string';
import { createGeneratorContext } from '../createGeneratorContext/createGeneratorContext';
import { processMgoType } from './processMgoType';

test('processes mgo types with their configured ui helper', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value: MgoString = {
        _type: 'string',
        value: faker.lorem.sentence(),
    };

    const expected = [string(healthUiSchemaContext)(path as FhirMessagesIds, value)];

    expect(processMgoType(context, path, value)).toEqual(expected);
});

test('it does not process properties that are nested inside the mgo type', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const context = createGeneratorContext(
        healthUiSchemaContext,
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value: MgoString & { nested: MgoBoolean } = {
        _type: 'string',
        value: faker.lorem.sentence(),
        nested: {
            _type: 'boolean',
            value: faker.datatype.boolean(),
        },
    };

    const expected = [string(healthUiSchemaContext)(path as FhirMessagesIds, value)];

    expect(processMgoType(context, path, value)).toEqual(expected);
});

test('it does process extension properties that are nested inside the mgo type and adds into its own group', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const context = createGeneratorContext(
        healthUiSchemaContext,
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value: MgoString & { nested: ExtensionValue<MgoBoolean> } = {
        _type: 'string',
        value: faker.lorem.sentence(),
        nested: {
            _ext: true,
            _type: 'boolean',
            value: faker.datatype.boolean(),
        },
    };

    const expected = [
        {
            label: path,
            children: [
                string(healthUiSchemaContext)(path as FhirMessagesIds, value),
                boolean(healthUiSchemaContext)(`${path}.nested` as FhirMessagesIds, value.nested),
            ],
        },
    ];

    expect(processMgoType(context, path, value)).toEqual(expected);
});

test('also processes deeply nested properties that are mgo types', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const context = createGeneratorContext(
        healthUiSchemaContext,
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value: MgoString & {
        foo: {
            deepNested: ExtensionValue<MgoBoolean>;
        };
    } = {
        _type: 'string',
        value: faker.lorem.sentence(),
        foo: {
            deepNested: {
                _ext: true,
                _type: 'boolean',
                value: faker.datatype.boolean(),
            },
        },
    };

    const expected = [
        {
            label: path,
            children: [
                string(healthUiSchemaContext)(path as FhirMessagesIds, value),
                boolean(healthUiSchemaContext)(
                    `${path}.foo.deep_nested` as FhirMessagesIds,
                    value.foo.deepNested
                ),
            ],
        },
    ];

    expect(processMgoType(context, path, value)).toEqual(expected);
});

test('also processes deeply nested array properties that are mgo types', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const healthUiSchemaContext = testUiSchemaContext({ useMock: true });
    const context = createGeneratorContext(
        healthUiSchemaContext,
        rootPath,
        faker.fhir.fhirVersion()
    );

    const value: MgoString & {
        foo: {
            deepNested: ExtensionValue<MgoBoolean>;
        }[];
    } = {
        _type: 'string',
        value: faker.lorem.sentence(),
        foo: [
            {
                deepNested: {
                    _ext: true,
                    _type: 'boolean',
                    value: faker.datatype.boolean(),
                },
            },
        ],
    };

    const expected = [
        {
            label: path,
            children: [
                string(healthUiSchemaContext)(path as FhirMessagesIds, value),
                boolean(healthUiSchemaContext)(
                    `${path}.foo.deep_nested` as FhirMessagesIds,
                    value.foo[0].deepNested
                ),
            ],
        },
    ];

    expect(processMgoType(context, path, value)).toEqual(expected);
});
