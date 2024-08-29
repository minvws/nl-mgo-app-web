import { faker, testSet } from '$test';
import { expect } from 'vitest';
import { map } from '../../../utils';
import { coding } from '../coding/coding';
import { codeableConcept } from './codeableConcept';

testSet(
    'codeableConcept',
    () =>
        faker.fhir.codeableConcept({
            coding: faker.custom.collection({
                min: 1,
                max: 5,
                factory: faker.fhir.coding,
            }),
        }),
    (data) => {
        const expected = map(data.coding, coding);
        expect(codeableConcept(data)).toEqual(expected);
    }
);
