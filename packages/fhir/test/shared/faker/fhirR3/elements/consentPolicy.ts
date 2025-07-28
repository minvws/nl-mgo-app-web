import { faker } from '@faker-js/faker';
import { type ConsentPolicy } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';

export const consentPolicy = createMockFactory<ConsentPolicy>(() => ({
    authority: faker.lorem.word(),
    uri: faker.lorem.word(),
}));
