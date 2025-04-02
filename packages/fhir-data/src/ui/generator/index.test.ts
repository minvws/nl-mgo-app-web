import { testUiSchemaContext } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { generateUiSchema } from '.';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';

const testMeta = {
    profile: 'http://fhir.nl/fhir/StructureDefinition/nl-core-patient',
    fhirVersion: 'R3',
    id: '123',
    referenceId: 'Patient/123',
    resourceType: 'Patient',
} satisfies MgoResourceMeta;

test('types are added', () => {
    const mgoResource = {
        ...testMeta,
        foo: {
            _type: 'string',
            value: 'bar',
        },
    };

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [
                    {
                        label: testMessage('r3.nl_core_patient.foo'),
                        type: 'SINGLE_VALUE',
                        display: 'bar',
                    },
                ],
            },
        ],
    };

    const result = generateUiSchema(mgoResource, testUiSchemaContext({ useMock: true }));
    expect(result).toEqual(expected);
});

test('nested types are added', () => {
    const mgoResource = {
        ...testMeta,
        foo: {
            bar: {
                _type: 'string',
                value: 'baz',
            },
        },
    };

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [
                    {
                        label: testMessage('r3.nl_core_patient.foo.bar'),
                        type: 'SINGLE_VALUE',
                        display: 'baz',
                    },
                ],
            },
        ],
    };

    const result = generateUiSchema(mgoResource, testUiSchemaContext({ useMock: true }));
    expect(result).toEqual(expected);
});

test('array values of the same type are processed together', () => {
    const mgoResource = {
        ...testMeta,
        foo: [
            {
                _type: 'string',
                value: 'bar',
            },
            {
                _type: 'string',
                value: 'baz',
            },
        ],
    };

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [
                    {
                        label: testMessage('r3.nl_core_patient.foo'),
                        type: 'MULTIPLE_VALUES',
                        display: ['bar', 'baz'],
                    },
                ],
            },
        ],
    };

    const result = generateUiSchema(mgoResource, testUiSchemaContext({ useMock: true }));
    expect(result).toEqual(expected);
});

test('array values of the different types are processed seperately', () => {
    const mgoResource = {
        ...testMeta,
        foo: [
            {
                _type: 'string',
                value: 'bar',
            },
            {
                _type: 'integer',
                value: 10,
            },
        ],
    };

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [
                    {
                        label: testMessage('r3.nl_core_patient.foo'),
                        type: 'SINGLE_VALUE',
                        display: 'bar',
                    },
                    {
                        label: testMessage('r3.nl_core_patient.foo'),
                        type: 'SINGLE_VALUE',
                        display: '10',
                    },
                ],
            },
        ],
    };

    const result = generateUiSchema(mgoResource, testUiSchemaContext({ useMock: true }));
    expect(result).toEqual(expected);
});

test('empty arrays are ignored', () => {
    const mgoResource = {
        ...testMeta,
        foo: [],
        bar: [null],
    };

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [],
            },
        ],
    };

    const result = generateUiSchema(mgoResource, testUiSchemaContext({ useMock: true }));
    expect(result).toEqual(expected);
});

test('nullish values are added as empty SINGLE_VALUE types', () => {
    const mgoResource = {
        ...testMeta,
        foo: null,
        bar: undefined,
    };

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [
                    {
                        display: undefined,
                        label: 'intl(r3.nl_core_patient.bar)',
                        type: 'SINGLE_VALUE',
                    },

                    {
                        display: undefined,
                        label: 'intl(r3.nl_core_patient.foo)',
                        type: 'SINGLE_VALUE',
                    },
                ],
            },
        ],
    };

    const result = generateUiSchema(mgoResource, testUiSchemaContext({ useMock: true }));
    expect(result).toEqual(expected);
});

test('properties that are not a ValueType are logged as an error to the console', () => {
    const mgoResource = {
        ...testMeta,
        foo: {
            _type: 'string',
            value: 'bar',
        },
        faz: 'fop',
    };

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [
                    {
                        label: testMessage('r3.nl_core_patient.foo'),
                        type: 'SINGLE_VALUE',
                        display: 'bar',
                    },
                ],
            },
        ],
    };

    const mockErrorLog = vi.spyOn(console, 'error');
    mockErrorLog.mockImplementationOnce(() => {});

    const result = generateUiSchema(mgoResource, testUiSchemaContext({ useMock: true }));
    expect(result).toEqual(expected);

    expect(mockErrorLog).toBeCalledWith(
        `Failed to process path: r3.nl_core_patient.faz with value:`,
        mgoResource.faz
    );
});

test('objects that have their own profile get their own group', () => {
    const mgoResource = {
        ...testMeta,
        foo: {
            _type: 'string',
            value: 'bar',
        },
        bar: {
            _profile: 'http://fhir.nl/fhir/StructureDefinition/nl-core-foo',
            bak: {
                _type: 'string',
                value: 'faz',
            },
        },
    };

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [
                    {
                        label: testMessage('r3.nl_core_patient.foo'),
                        type: 'SINGLE_VALUE',
                        display: 'bar',
                    },
                ],
            },
            {
                label: testMessage('r3.nl_core_foo'),
                children: [
                    {
                        label: testMessage('r3.nl_core_foo.bak'),
                        type: 'SINGLE_VALUE',
                        display: 'faz',
                    },
                ],
            },
        ],
    };

    const result = generateUiSchema(mgoResource, testUiSchemaContext({ useMock: true }));
    expect(result).toEqual(expected);
});
