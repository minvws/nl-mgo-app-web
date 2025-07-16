import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type CodeableConcept } from 'fhir/r3';
import { coding } from './coding';

export const codeableConcept = createMockFactory<CodeableConcept>(() => {
    return {
        text: faker.lorem.sentence(),
        coding: mockArray({ max: 5, factory: coding }),
    };
});
