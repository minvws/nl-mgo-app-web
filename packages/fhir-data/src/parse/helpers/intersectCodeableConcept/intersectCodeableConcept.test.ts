import { faker } from '$test';
import { collection } from '$test/faker/helpers';
import { test, expect } from 'vitest';
import { intersectCodeableConcept } from './intersectCodeableConcept';

test('CodeableConcepts that intersect with given valueset returns matching CodeableConcepts', () => {
    const valueSet = [faker.fhir.coding(), faker.fhir.coding(), faker.fhir.coding()];
    const expected = faker.fhir.codeableConcept({
        coding: [valueSet[0]],
    });

    const input = [
        expected,
        ...collection({
            min: 1,
            max: 4,
            factory: faker.fhir.codeableConcept,
        }),
    ];

    const value = intersectCodeableConcept(input, valueSet);
    expect(value).toEqual([expected]);
});

test('CodeableConcepts that does not intersect with given valueset returns empty array', () => {
    const valueSet = [faker.fhir.coding(), faker.fhir.coding(), faker.fhir.coding()];

    const input = collection({
        min: 1,
        max: 5,
        factory: faker.fhir.codeableConcept,
    });

    const value = intersectCodeableConcept(input, valueSet);
    expect(value).toHaveLength(0);
});

test('CodeableConcept with no coding and returns empty array', () => {
    const valueSet = [faker.fhir.coding()];

    const emptyCodeableConcept = {
        ...faker.fhir.codeableConcept(),
        coding: undefined,
    };

    const value = intersectCodeableConcept([emptyCodeableConcept], valueSet);
    expect(value).toHaveLength(0);
});
