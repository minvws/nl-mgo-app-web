import { faker } from '@faker-js/faker';
import { type ConsentPolicy } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';

export const consentPolicy = createMockDataFactory<ConsentPolicy>(() => ({
    authority: faker.lorem.word(),
    uri: faker.lorem.word(),
}));
