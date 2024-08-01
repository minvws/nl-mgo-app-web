import { faker } from '@faker-js/faker';
import { type Reference } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../helpers/mockOptionalFields';

export const reference = createMockDataFactory<Reference>(() => {
    return mockOptionalFields({
        display: faker.lorem.sentence(),
        reference: faker.lorem.sentence(),
    });
});
