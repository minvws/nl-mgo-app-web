import { faker } from '$test';
import { collection } from '$test/faker/helpers';
import { type CodingSystem } from '@minvws/mgo-fhir-types';
import { expect, test } from 'vitest';
import { type CodingSystemFilter, filterCoding } from './filterCoding';

/**
 * For our tests we need the coding to be unique, otherwise we run the risk of
 * generating a similar Coding that can break the expected result
 */
function mockCoding() {
    return {
        ...faker.fhir.coding(),
        system: faker.string.uuid() as CodingSystem,
        code: faker.string.uuid(),
    };
}

test('filters an array of Codings and return the ONE that matches the CODING', () => {
    const coding = mockCoding();
    const codings = [
        ...collection({
            min: 1,
            max: 4,
            factory: mockCoding,
        }),
        coding,
    ];
    const filter = { ...coding };
    const value = filterCoding(codings, filter);
    expect(value).toEqual(coding);
});

test('filters an array of Codings and return the ALL that matches the system', () => {
    const coding = mockCoding();
    const codings = [
        ...collection({
            min: 1,
            max: 4,
            factory: () => ({
                ...mockCoding(),
                system: coding.system + faker.lorem.word(),
            }),
        }),
        coding,
    ];
    const filter = { system: coding.system };
    const value = filterCoding(codings, filter);
    expect(value).toEqual([coding]);
});

test('filters an array of Codings and returns undefined if no match is found', () => {
    const codings = [
        ...collection({
            min: 1,
            max: 4,
            factory: mockCoding,
        }),
    ];
    const filter = mockCoding();
    const value = filterCoding(codings, filter);
    expect(value).toBeUndefined();
});

test('filters an array of Codings and returns ALL that match any of the CODINGS', () => {
    const coding = mockCoding();
    const coding2 = mockCoding();
    const codings = [
        ...collection({
            min: 1,
            max: 4,
            factory: mockCoding,
        }),
        coding,
        coding2,
    ];
    const filter = [coding, coding2, mockCoding()];
    const value = filterCoding(codings, filter);
    expect(value).toEqual([coding, coding2]);
});

test('filters a single of Coding and returns IT if it matches the CODING', () => {
    const coding = mockCoding();
    const filter = { ...coding };
    const value = filterCoding(coding, filter);
    expect(value).toEqual(coding);
});

test('filters a single of Coding and returns IT if it matches the SYSTEM', () => {
    const coding = mockCoding();
    const filter = { system: coding.system };
    const value = filterCoding(coding, filter);
    expect(value).toEqual(coding);
});

test('filters a single of Coding and returns IT if it matches ANY OF the CODINGS', () => {
    const coding = mockCoding();
    const filter = [
        ...collection({
            min: 1,
            max: 4,
            factory: mockCoding,
        }),
        coding,
    ];

    const value = filterCoding(coding, filter);
    expect(value).toEqual(coding);
});

test('filters a single of Coding and returns IT if it matches ANY OF the SYSTEMS', () => {
    const coding = mockCoding();
    const filter = [
        { system: coding.system },
        { system: faker.lorem.word() },
    ] as CodingSystemFilter[];

    const value = filterCoding(coding, filter);
    expect(value).toEqual(coding);
});

test('filters a single of Coding and returns UNDEFINED if it does NOT MATCH the CODING', () => {
    const coding = mockCoding();
    const filter = mockCoding();

    const value = filterCoding(coding, filter);
    expect(value).toBeUndefined();
});
