import { faker } from '$test';
import { collection } from '$test/faker/helpers';
import { test, expect } from 'vitest';
import { filterCodeableConceptByCoding } from './filterCodeableConceptByCoding';

test('CodeableConcept matched by coding and returns the CodeableConcept', () => {
    const coding = faker.fhir.coding({
        system: faker.internet.url(),
    });
    const match = faker.fhir.codeableConcept({
        coding: [coding],
    });

    const input = [
        match,
        ...collection({
            min: 1,
            max: 4,
            factory: faker.fhir.codeableConcept,
        }),
    ];

    const value = filterCodeableConceptByCoding(input, (x) => x.system === coding.system);
    expect(value).toEqual([match]);
});

test('CodeableConcept does not match by coding and returns empty array', () => {
    const input = collection({
        min: 1,
        max: 5,
        factory: faker.fhir.codeableConcept,
    });

    const value = filterCodeableConceptByCoding(input, (x) => x.code === 'empty');
    expect(value).toHaveLength(0);
});

test('CodeableConcept does not have items and returns undefined', () => {
    const value = filterCodeableConceptByCoding(null, (x) => x.code === faker.fhir.coding().code);
    expect(value).toBeUndefined();
});
