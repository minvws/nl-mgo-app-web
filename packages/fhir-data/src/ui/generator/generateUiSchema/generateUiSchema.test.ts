import { faker, testUiSchemaContext } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { type MgoResourceMeta } from '../../../parse/helpers/resourceMeta/resourceMeta';
import { type HealthUiGroup, type UiElement } from '../../types';
import { processValue } from '../processValue/processValue';
import { generateUiSchema } from './generateUiSchema';

vi.mock('../processValue/processValue', () => {
    return {
        processValue: vi.fn(),
    };
});

const testMeta = {
    profile: 'http://fhir.nl/fhir/StructureDefinition/nl-core-patient', // NOSONAR
    fhirVersion: 'R3',
    id: '123',
    referenceId: 'Patient/123',
    resourceType: 'Patient',
} satisfies MgoResourceMeta;

test('elements are added to a default labelless group', () => {
    const context = testUiSchemaContext({ useMock: true });
    const mgoResource = {
        ...testMeta,
        foo: {
            _type: 'string',
            value: 'bar',
        },
    };

    const elements: (UiElement | HealthUiGroup)[] = [
        {
            label: testMessage('r3.nl_core_patient.foo'),
            type: 'SINGLE_VALUE',
            display: faker.lorem.sentence(),
        },
    ];

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: elements,
            },
        ],
    };

    vi.mocked(processValue).mockReturnValueOnce(elements);

    expect(generateUiSchema(mgoResource, context)).toEqual(expected);
});

test('group labels that start with r3 or r4 are translated', () => {
    const context = testUiSchemaContext({ useMock: true });
    const mgoResource = {
        ...testMeta,
        foo: {
            _type: 'string',
            value: 'bar',
        },
    };

    const group: HealthUiGroup = {
        label: faker.helpers.arrayElement(['r3.', 'r4.']) + faker.lorem.word(),
        children: [
            {
                label: faker.lorem.word(),
                type: 'SINGLE_VALUE',
                display: faker.lorem.sentence(),
            },
        ],
    };

    const group2: HealthUiGroup = {
        label: faker.lorem.word(),
        children: [
            {
                label: faker.lorem.word(),
                type: 'SINGLE_VALUE',
                display: faker.lorem.sentence(),
            },
        ],
    };

    const elements = [group, group2];

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [],
            },
            {
                label: testMessage(group.label),
                children: group.children,
            },
            {
                label: group2.label,
                children: group2.children,
            },
        ],
    };

    vi.mocked(processValue).mockReturnValueOnce(elements);

    expect(generateUiSchema(mgoResource, context)).toEqual(expected);
});

test('elements are sorted by label', () => {
    const context = testUiSchemaContext({ useMock: true });
    const mgoResource = {
        ...testMeta,
        foo: {
            _type: 'string',
            value: 'bar',
        },
    };

    const elements: (UiElement | HealthUiGroup)[] = [
        {
            label: 'a' + faker.lorem.word(),
            type: 'SINGLE_VALUE',
            display: faker.lorem.sentence(),
        },
        {
            label: 'c' + faker.lorem.word(),
            type: 'SINGLE_VALUE',
            display: faker.lorem.sentence(),
        },
        {
            label: 'b' + faker.lorem.word(),
            type: 'SINGLE_VALUE',
            display: faker.lorem.sentence(),
        },
    ];

    const expected = {
        label: testMessage('r3.nl_core_patient'),
        children: [
            {
                children: [elements[0], elements[2], elements[1]],
            },
        ],
    };

    vi.mocked(processValue).mockReturnValueOnce(elements);

    expect(generateUiSchema(mgoResource, context)).toEqual(expected);
});
