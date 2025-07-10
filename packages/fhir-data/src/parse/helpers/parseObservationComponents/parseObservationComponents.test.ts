import { faker } from '$test';
import { type ObservationComponent } from '@minvws/mgo-fhir-types';
import { expect, test, vi } from 'vitest';
import { quantity } from '../../parse';
import { valueX } from '../valueX/valueX';
import { parseObservationComponents } from './parseObservationComponents';

vi.mock('../valueX/valueX', async (importActual) => {
    const module = await importActual<typeof import('../valueX/valueX')>();
    return {
        ...module,
        valueX: vi.fn(module.valueX),
    };
});

test('matches components by system and code and returns the parsed object', () => {
    const coding = faker.fhir.coding();
    const valueQuantity = faker.fhir.quantity();

    const observationComponents: ObservationComponent[] = [
        {
            code: {
                coding: [coding],
            },
            valueQuantity,
        },
    ];

    const expected = {
        systolicBP: [
            {
                valueQuantity: quantity(valueQuantity),
            },
        ],
    };

    const result = parseObservationComponents(observationComponents, {
        systolicBP: {
            coding,
            type: 'quantity',
        },
    });

    expect(result).toEqual(expected);
});

test('returns an empty object if there is no match', () => {
    const coding = faker.fhir.coding();
    const valueQuantity = faker.fhir.quantity();

    const observationComponents: ObservationComponent[] = [
        {
            code: {
                coding: [coding],
            },
            valueQuantity,
        },
    ];

    const expected = {};

    const result = parseObservationComponents(observationComponents, {
        systolicBP: {
            coding: {
                ...coding,
                code: coding.code + faker.lorem.word(),
            },
            type: 'quantity',
        },
    });

    expect(result).toEqual(expected);
});

test('returns an empty object  if there is no match - no coding', () => {
    const coding = faker.fhir.coding();
    const valueQuantity = faker.fhir.quantity();

    const observationComponents: ObservationComponent[] = [
        {
            code: {},
            valueQuantity,
        },
    ];

    const expected = {};

    const result = parseObservationComponents(observationComponents, {
        systolicBP: {
            coding: {
                ...coding,
                code: coding.code + faker.lorem.word(),
            },
            type: 'quantity',
        },
    });

    expect(result).toEqual(expected);
});

test('returns undefined if there are no components', () => {
    const coding = faker.fhir.coding();
    const observationComponents: ObservationComponent[] | null = null;
    const result = parseObservationComponents(observationComponents, {
        systolicBP: {
            coding: {
                ...coding,
                code: coding.code + faker.lorem.word(),
            },
            type: 'quantity',
        },
    });

    expect(result).toBe(undefined);
});

test('still adds the properties when the parsing result is nullish', () => {
    const coding = faker.fhir.coding();
    const valueQuantity = faker.fhir.quantity();

    vi.mocked(valueX).mockReturnValueOnce(null);

    const observationComponents: ObservationComponent[] = [
        {
            code: {
                coding: [coding],
            },
            valueQuantity,
        },
    ];

    const expected = {
        systolicBP: [
            {
                valueQuantity: null,
            },
        ],
    };

    const result = parseObservationComponents(observationComponents, {
        systolicBP: {
            coding,
            type: 'quantity',
        },
    });

    expect(result).toEqual(expected);
});
