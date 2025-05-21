import { faker } from '@faker-js/faker';
import { type Reference } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';

export const reference = createMockDataFactory<Reference>(() => ({
    display: faker.lorem.sentence(),
    reference: faker.lorem.sentence(),
}));
