import { faker } from '@faker-js/faker';
import { type CodeableConcept } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection, mockOptionalFields } from '../../helpers';
import { coding } from './coding';

export const codeableConcept = createMockDataFactory<CodeableConcept>(() => {
    return mockOptionalFields({
        coding: collection({ max: 5, factory: coding }),
        text: faker.lorem.sentence(),
    });
});
