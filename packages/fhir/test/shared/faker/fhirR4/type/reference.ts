import { faker } from '@faker-js/faker';
import { type Reference } from '@minvws/mgo-fhir/r4';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';

export const reference = createMockFactory<Reference>(() => ({
    display: faker.lorem.sentence(),
    reference: faker.lorem.sentence(),
}));
