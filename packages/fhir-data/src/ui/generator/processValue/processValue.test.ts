import { faker, testUiSchemaContext } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { type MgoIdentifier, type MgoString } from '../../../parse/type';
import { type HealthUiGroup, type UiElement } from '../../types';
import { createGeneratorContext } from '../createGeneratorContext/createGeneratorContext';
import { getProfileKey } from '../getProfileKey/getProfileKey';
import { processValue } from './processValue';

test('null values result in no elements', () => {
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        faker.lorem.word(),
        faker.fhir.fhirVersion()
    );
    const path = context.rootPath;

    const value = null;
    const expected: (UiElement | HealthUiGroup)[] = [];

    expect(processValue(context, path, value)).toEqual(expected);
});

test('primitive value types are processed', () => {
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        faker.lorem.word(),
        faker.fhir.fhirVersion()
    );
    const path = context.rootPath;

    const value: MgoString = {
        _type: 'string',
        value: faker.lorem.sentence(),
    };
    const expected: (UiElement | HealthUiGroup)[] = [
        {
            type: 'SINGLE_VALUE',
            label: testMessage(path),
            display: value.value,
        },
    ];

    expect(processValue(context, path, value)).toEqual(expected);
});

test('value types are processed', () => {
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        faker.lorem.word(),
        faker.fhir.fhirVersion()
    );
    const path = context.rootPath;

    const value: MgoIdentifier = {
        _type: 'identifier',
        value: faker.string.uuid(),
        use: undefined,
        system: undefined,
        type: undefined,
    };
    const expected: (UiElement | HealthUiGroup)[] = [
        {
            type: 'SINGLE_VALUE',
            label: testMessage(path),
            display: value.value,
        },
    ];

    expect(processValue(context, path, value)).toEqual(expected);
});

test('arrays are processed', () => {
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        faker.lorem.word(),
        faker.fhir.fhirVersion()
    );
    const path = context.rootPath;

    const value = [
        {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
        {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
    ];
    const expected: (UiElement | HealthUiGroup)[] = [
        {
            type: 'MULTIPLE_VALUES',
            label: testMessage(path),
            display: [value[0].value, value[1].value],
        },
    ];

    expect(processValue(context, path, value)).toEqual(expected);
});

test('objects are processed', () => {
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        faker.lorem.word(),
        faker.fhir.fhirVersion()
    );
    const path = context.rootPath;

    const value = {
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
    };
    const expected: (UiElement | HealthUiGroup)[] = [
        {
            type: 'SINGLE_VALUE',
            label: testMessage(`${path}.foo`),
            display: value.foo.value,
        },
    ];

    expect(processValue(context, path, value)).toEqual(expected);
});

test('logs an error for values it can not process', () => {
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        faker.lorem.word(),
        faker.fhir.fhirVersion()
    );
    const path = context.rootPath;

    const value = faker.lorem.word();
    const expected: (UiElement | HealthUiGroup)[] = [];

    const mockErrorLog = vi.spyOn(console, 'error');
    mockErrorLog.mockImplementationOnce(() => {});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(processValue(context, path, value as any)).toEqual(expected);
    expect(mockErrorLog).toBeCalledWith(`Failed to process path: ${path} with value:`, value);
});

test('Mgo elements get their own group', () => {
    const context = createGeneratorContext(
        testUiSchemaContext({ useMock: true }),
        faker.lorem.word(),
        faker.fhir.fhirVersion()
    );
    const path = context.rootPath;

    const value = {
        _profile: 'http://fhir.nl/fhir/StructureDefinition/nl-core-foo',
        foo: {
            _type: 'string',
            value: faker.lorem.sentence(),
        },
    } as const;

    const profileKey = getProfileKey(context.fhirVersion, value._profile);
    const expected: (UiElement | HealthUiGroup)[] = [
        {
            label: profileKey,
            children: [
                {
                    type: 'SINGLE_VALUE',
                    label: testMessage(`${profileKey}.foo`),
                    display: value.foo.value,
                },
            ],
        },
    ];

    expect(processValue(context, path, value)).toEqual(expected);
});
