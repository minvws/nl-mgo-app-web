import { mockOptionalFields } from '$test/faker/helpers';
import { faker } from '@faker-js/faker';
import { type Reference } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';

export const reference = createMockDataFactory<Reference>(() => {
    return mockOptionalFields({
        display: faker.lorem.sentence(),
        reference: faker.lorem.sentence(),
    });
});
