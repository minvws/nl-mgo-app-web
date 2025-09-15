import { faker } from '$test';
import {
    type ExtensionValue,
    type MgoCodeableConcept,
    type MgoString,
} from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { boolean } from '../../type/boolean/boolean.js';
import { codeableConcept } from '../../type/codeableConcept/codeableConcept.js';
import { string } from '../../type/string/string.js';
import { createGeneratorContext } from '../createGeneratorContext/createGeneratorContext.js';
import { processObject } from '../processObject/processObject.js';
import { processArray } from './processArray.js';

test('values of the same type get processed together', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const uiContext = faker.ui.context();
    const context = createGeneratorContext(uiContext, rootPath, faker.fhir.fhirVersion());

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

    const expected = [string(uiContext)(path as FhirMessagesIds, value)];

    expect(processArray(context, path, value)).toEqual(expected);
});

test('values of different types are processed seperately', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const uiContext = faker.ui.context();
    const context = createGeneratorContext(uiContext, rootPath, faker.fhir.fhirVersion());

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
        string(uiContext)(path as FhirMessagesIds, value[0]),
        boolean(uiContext)(path as FhirMessagesIds, value[1]),
        string(uiContext)(path as FhirMessagesIds, value[2]),
    ];

    expect(processArray(context, path, value as any)).toEqual(expected); // eslint-disable-line @typescript-eslint/no-explicit-any
});

test('non-mgo types are processed as usual', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const uiContext = faker.ui.context();
    const context = createGeneratorContext(uiContext, rootPath, faker.fhir.fhirVersion());

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
        string(uiContext)(path as FhirMessagesIds, value[0]),
        ...processObject(context, path, value[1]),
    ];

    expect(processArray(context, path, value as any)).toEqual(expected); // eslint-disable-line @typescript-eslint/no-explicit-any
});

test('empty array returns empty result', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const uiContext = faker.ui.context();
    const context = createGeneratorContext(uiContext, rootPath, faker.fhir.fhirVersion());

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

test('processes extension values', () => {
    const rootPath = faker.lorem.word();
    const path = rootPath;
    const uiContext = faker.ui.context();
    const context = createGeneratorContext(uiContext, rootPath, faker.fhir.fhirVersion());

    const value: ExtensionValue<MgoCodeableConcept>[] = [
        {
            _ext: true,
            _type: 'codeableConcept',
            text: undefined,
            coding: [
                {
                    code: '4',
                    display: 'Onder toezichtstelling (ots)',
                    system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.2.14.3.2',
                },
            ],
        },
    ];

    const expected = [codeableConcept(uiContext)(path as FhirMessagesIds, value)];

    expect(processArray(context, path, value)).toEqual(expected);
});
