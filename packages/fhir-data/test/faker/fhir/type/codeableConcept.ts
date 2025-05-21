import { faker } from '@faker-js/faker';
import { type CodeableConcept } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection } from '../../helpers';
import { coding } from './coding';

export const codeableConcept = createMockDataFactory<CodeableConcept>(() => {
    return {
        text: faker.lorem.sentence(),
        coding: collection({ max: 5, factory: coding }),
    };
});
