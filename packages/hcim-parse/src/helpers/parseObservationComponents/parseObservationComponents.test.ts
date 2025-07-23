import { faker } from '$test';
import { type ObservationComponent } from '@minvws/mgo-fhir';
import { nullish } from '@minvws/mgo-utils/test/shared';
import { Quantity } from 'fhir/r3';
import { expect, test } from 'vitest';
import { quantity } from '../../parse';
import { parseObservationComponents } from './parseObservationComponents';

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
    const valueQuantity = nullish<Quantity>() as Quantity;

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
                valueQuantity: undefined,
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
