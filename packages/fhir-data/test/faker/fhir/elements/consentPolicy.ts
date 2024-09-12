import { faker } from '@faker-js/faker';
import { mockOptionalFields } from '$test/faker/helpers';
import { type ConsentPolicy } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';

export const consentPolicy = createMockDataFactory<ConsentPolicy>(() => {
    return mockOptionalFields({
        authority: faker.lorem.word(),
        uri: faker.lorem.word(),
    });
});
