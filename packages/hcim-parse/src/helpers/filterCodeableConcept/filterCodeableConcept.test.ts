import { faker } from '$test';
import { type CodingSystem } from '@minvws/mgo-fhir';
import { type CodeableConcept, type Coding } from '@minvws/mgo-fhir/r3';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { expect, test } from 'vitest';
import { filterCodeableConcept } from './filterCodeableConcept.js';

type FakeCoding = {
    code: string;
    system: CodingSystem;
};

/**
 * For our tests we need the coding to be unique, otherwise we run the risk of
 * generating a similar Coding that can break the expected result
 */
function mockCoding(partial: { system?: string } = {}): FakeCoding {
    return {
        ...faker.fhir.coding(),
        ...partial,
        code: faker.string.uuid(), // ensure unique code
    } as FakeCoding;
}

function mockCodeableConcept(partial: { coding?: Coding[] } = {}): CodeableConcept {
    return {
        ...faker.fhir.codeableConcept(),
        coding: mockArray({
            min: 1,
            max: 4,
            factory: mockCoding,
        }),
        ...partial,
    };
}

test('filters an array of CodeableConcepts and return the ONE that matches the CODING', () => {
    const coding = mockCoding();
    const codeableConcept = mockCodeableConcept({
        coding: [coding],
    });
    const filter = coding;
    const input = [
        codeableConcept,
        ...mockArray({
            min: 1,
            max: 4,
            factory: mockCodeableConcept,
        }),
    ];

    const result = filterCodeableConcept(input, filter);
    expect(result).toEqual(codeableConcept);
});

test('filters an array of CodeableConcepts and return the ALL that matches the SYSTEM', () => {
    const coding = mockCoding({
        system: faker.string.uuid(), // ensure a unique system value
    });
    const codeableConcept = mockCodeableConcept({ coding: [coding] });
    const codeableConcept2 = mockCodeableConcept({
        coding: [mockCoding({ system: coding.system })],
    });

    const input = [
        codeableConcept,
        {
            ...mockCodeableConcept(),
            coding: [
                mockCoding({
                    system: faker.internet.url() as CodingSystem,
                }),
            ],
        },
        codeableConcept2,
        {
            ...mockCodeableConcept(),
            coding: [
                mockCoding({
                    system: faker.internet.url() as CodingSystem,
                }),
            ],
        },
    ];

    const result = filterCodeableConcept(input, { system: coding.system });
    expect(result).toEqual([codeableConcept, codeableConcept2]);
});

test('filters an array of CodeableConcepts and returns undefined if no match is found', () => {
    const coding = mockCoding();

    const input = [
        ...mockArray({
            min: 1,
            max: 4,
            factory: mockCodeableConcept,
        }),
    ];

    const result = filterCodeableConcept(input, coding);
    expect(result).toBeUndefined();
});

test('filters an array of CodeableConcepts and returns ALL that match any of the CODINGS', () => {
    const coding = mockCoding();
    const coding2 = mockCoding();
    const codeableConcept = mockCodeableConcept({
        coding: [
            ...mockArray({
                min: 1,
                max: 4,
                factory: mockCoding,
            }),
            coding,
        ],
    });
    const codeableConcept2 = mockCodeableConcept({
        coding: [
            ...mockArray({
                min: 1,
                max: 4,
                factory: mockCoding,
            }),
            coding,
        ],
    });

    const input = [
        codeableConcept,
        codeableConcept2,
        ...mockArray({
            min: 1,
            max: 4,
            factory: mockCodeableConcept,
        }),
    ];

    const result = filterCodeableConcept(input, [coding, coding2]);
    expect(result).toEqual([codeableConcept, codeableConcept2]);
});

test('filters a single of CodeableConcept and returns IT if it matches the CODING', () => {
    const coding = mockCoding();
    const codeableConcept = mockCodeableConcept({
        coding: [
            ...mockArray({
                min: 1,
                max: 4,
                factory: mockCoding,
            }),
            coding,
        ],
    });

    const result = filterCodeableConcept(codeableConcept, coding);
    expect(result).toEqual(codeableConcept);
});

test('filters a single of CodeableConcept and returns IT if it matches ANY OF the CODINGS', () => {
    const coding = mockCoding();
    const codings = [
        ...mockArray({
            min: 1,
            max: 4,
            factory: mockCoding,
        }),
        coding,
    ];
    const codeableConcept = mockCodeableConcept({
        coding: [
            ...mockArray({
                min: 1,
                max: 4,
                factory: mockCoding,
            }),
            coding,
        ],
    });

    const result = filterCodeableConcept(codeableConcept, codings);
    expect(result).toEqual(codeableConcept);
});

test('filters a single of CodeableConcept and returns IT if it matches ANY OF the SYSTEM', () => {
    const coding = mockCoding();
    const filter = [{ system: coding.system }];
    const codeableConcept = mockCodeableConcept({
        coding: [
            ...mockArray({
                min: 1,
                max: 4,
                factory: mockCoding,
            }),
            coding,
        ],
    });

    const result = filterCodeableConcept(codeableConcept, filter);
    expect(result).toEqual(codeableConcept);
});

test('filters a single of CodeableConcept and returns UNDEFINED if it does NOT MATCH the CODING', () => {
    const filter = mockCoding();
    const codeableConcept = mockCodeableConcept();

    const result = filterCodeableConcept(codeableConcept, filter);
    expect(result).toBeUndefined();
});

test('returns undefined if the CodeableConcept is nullish', () => {
    const filter = mockCoding();
    const result = filterCodeableConcept(null, filter);
    expect(result).toBeUndefined();
});

test('returns undefined if the CodeableConcept is an empty array', () => {
    const filter = mockCoding();
    const result = filterCodeableConcept([], filter);
    expect(result).toBeUndefined();
});

test('returns undefined if the CodeableConcept does not have any coding', () => {
    const filter = mockCoding();
    const codeableConcept = {
        ...mockCodeableConcept(),
        coding: undefined,
    };
    const result = filterCodeableConcept(codeableConcept, filter);
    expect(result).toBeUndefined();
});
