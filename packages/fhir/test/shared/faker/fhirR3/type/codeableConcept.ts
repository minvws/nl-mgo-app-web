import { faker } from '@faker-js/faker';
import { type CodeableConcept } from '@minvws/mgo-fhir/r3';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { coding } from './coding.js';

export const codeableConcept = createMockFactory<CodeableConcept>(() => {
    return {
        text: faker.lorem.sentence(),
        coding: mockArray({ max: 5, factory: coding }),
    };
});
