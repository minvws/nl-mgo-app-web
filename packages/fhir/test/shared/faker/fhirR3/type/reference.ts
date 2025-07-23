import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type Reference } from 'fhir/r3';

export const reference = createMockFactory<Reference>(() => ({
    display: faker.lorem.sentence(),
    reference: faker.lorem.sentence(),
}));
