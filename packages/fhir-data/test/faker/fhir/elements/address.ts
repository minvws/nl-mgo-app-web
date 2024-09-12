import { faker } from '@faker-js/faker';
import { type Address } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { collection, mockOptionalFields } from '../../helpers';
import { code, period } from '../type';

export const address = createMockDataFactory<Address>(() => {
    return mockOptionalFields({
        use: code(['home', 'work', 'temp', 'old']),
        type: code(['postal', 'physical', 'both']),
        text: faker.lorem.word(),
        line: collection({ max: 5, factory: faker.lorem.word }),
        city: faker.location.city(),
        district: faker.location.county(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
        period: period(),
    });
});
