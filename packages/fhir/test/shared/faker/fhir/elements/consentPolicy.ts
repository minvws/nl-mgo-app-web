import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type ConsentPolicy } from 'fhir/r3';

export const consentPolicy = createMockFactory<ConsentPolicy>(() => ({
    authority: faker.lorem.word(),
    uri: faker.lorem.word(),
}));
